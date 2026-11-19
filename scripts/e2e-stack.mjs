// Own every local process and DB. Never read application .env or reuse an app server.
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { randomBytes } from 'node:crypto';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const backend = resolve(process.env.E2E_BACKEND_DIR || resolve(root, '../autotable-Go'));
if (!existsSync(resolve(backend, 'go.mod'))) throw new Error('Set E2E_BACKEND_DIR to a checkout of github.com/osmansam/autotable-Go');
const temp = mkdtempSync(resolve(tmpdir(), 'tenant-panel-e2e-'));
const children = [];
let stopping = false;
async function cleanup(code = 0) {
  if (stopping) return;
  stopping = true;
  rmSync(resolve(root, 'output/playwright/fixture.json'), { force: true });
  // Stop the API before its Redis/Mongo dependencies so its deferred DB drop can finish.
  for (const child of [...children].reverse()) {
    if (child.exitCode !== null || child.signalCode !== null) continue;
    await new Promise(done => {
      const timer = setTimeout(() => { child.kill('SIGKILL'); done(); }, 4000);
      child.once('exit', () => { clearTimeout(timer); done(); });
      child.kill('SIGTERM');
    });
  }
  rmSync(temp, { recursive: true, force: true });
  process.exit(code);
}
process.on('SIGINT', () => void cleanup()); process.on('SIGTERM', () => void cleanup());
function start(command, args, env = process.env, cwd = root) {
  const child = spawn(command, args, { cwd, env, stdio: 'inherit' }); children.push(child);
  child.on('error', err => { console.error(err); void cleanup(1); });
  child.on('exit', code => { if (!stopping) { console.error(`${command} exited unexpectedly (${code})`); void cleanup(1); } });
  return child;
}
const freePort = () => new Promise(resolvePort => { const server = net.createServer(); server.listen(0, '127.0.0.1', () => { const port = server.address().port; server.close(() => resolvePort(String(port))); }); });
const pause = ms => new Promise(done => setTimeout(done, ms));
async function until(check, message) { for (let i = 0; i < 240; i++) { if (await check()) return; await pause(250); } throw new Error(message); }
function bin(name, fallback) { try { return execFileSync('which', [name], { encoding: 'utf8' }).trim(); } catch { if (fallback && existsSync(fallback)) return fallback; throw new Error(`${name} is required; see docs/e2e.md`); } }
try {
  let mongoURI = process.env.E2E_MONGO_URI;
  if (mongoURI) {
    const url = new URL(mongoURI);
    if (!['127.0.0.1', 'localhost'].includes(url.hostname) || !url.searchParams.has('replicaSet')) throw new Error('E2E_MONGO_URI must be a loopback Mongo replica set; only a generated e2e database is used');
  } else {
    const port = await freePort(); const mongod = bin('mongod', '/opt/homebrew/opt/mongodb-community@5.0/bin/mongod');
    const shell = process.env.MONGO_SHELL_BIN || (existsSync(resolve(dirname(mongod), 'mongo')) ? resolve(dirname(mongod), 'mongo') : bin('mongosh'));
    const dbpath = resolve(temp, 'mongo'); mkdirSync(dbpath);
    const mongoProcess = start(mongod, ['--dbpath', dbpath, '--port', port, '--bind_ip', '127.0.0.1', '--replSet', 'panel-e2e', '--logpath', resolve(temp, 'mongo.log')]);
    const direct = `mongodb://127.0.0.1:${port}/?directConnection=true&serverSelectionTimeoutMS=500`;
    const evaluate = script => { try { execFileSync(shell, [direct, '--quiet', '--eval', script], { stdio: 'ignore' }); return true; } catch { return false; } };
    await until(() => evaluate('quit(db.adminCommand({ping:1}).ok ? 0 : 1)'), 'Mongo did not start');
    // Prove ownership before mutating a server reached through a probed port.
    if (!evaluate(`const cmd=db.adminCommand({getCmdLineOpts:1}); const status=db.serverStatus(); if(cmd.parsed.storage.dbPath!==${JSON.stringify(dbpath)} || Number(status.pid)!==${mongoProcess.pid}) throw Error('Mongo ownership mismatch'); if(!rs.initiate({_id:'panel-e2e',members:[{_id:0,host:'127.0.0.1:${port}'}]}).ok) throw Error('Replica init failed')`)) throw new Error('Refusing to initialize Mongo: process ownership/replica initialization failed');
    await until(() => evaluate('quit(db.hello().isWritablePrimary ? 0 : 1)'), 'Mongo replica set has no primary');
    mongoURI = `mongodb://127.0.0.1:${port}/?replicaSet=panel-e2e`;
  }
  const redisPort = await freePort(); start(bin('redis-server'), ['--bind', '127.0.0.1', '--port', redisPort, '--save', '', '--appendonly', 'no', '--dir', temp, '--logfile', resolve(temp, 'redis.log')]);
  const key = randomBytes(24).toString('hex');
  const dbName = `tenant_panel_e2e_${randomBytes(12).toString('hex')}`;
  // An allowlisted env prevents .env credentials, mail configuration or real DB names leaking into this server.
  const env = { PATH: process.env.PATH, HOME: process.env.HOME, TMPDIR: process.env.TMPDIR || tmpdir(), GOCACHE: process.env.GOCACHE, GOPATH: process.env.GOPATH, NODE_ENV: 'development', MONGO_URI_BASE: `mongodb://${new URL(mongoURI).host}/`, MONGO_URI_SUFFIX: new URL(mongoURI).search,  COLLECTION_NAME: dbName, REDIS_PASSWORD: '', E2E_REDIS_PORT: redisPort, E2E_FIXTURE_KEY: key, JWT_SECRET: randomBytes(40).toString('hex'), TENANT_JWT_SECRET: randomBytes(40).toString('hex'), COLLABORATION_MEMBERS_ENABLED: 'true', COLLABORATION_INVITATIONS_ENABLED: 'true', COLLABORATION_RECOVERY_ENABLED: 'true', INVITATION_SMTP_HOST: 'capture.example.test', INVITATION_SMTP_FROM: 'smoke@example.test', INVITATION_PANEL_URL: 'https://panel.example.test', INVITATION_DELIVERY_KEYS_JSON: JSON.stringify({ smoke: randomBytes(32).toString('base64') }), INVITATION_DELIVERY_ACTIVE_KEY_ID: 'smoke' };
  const executable = resolve(temp, 'backend');
  execFileSync('go', ['build', '-o', executable, resolve(root, 'e2e/backend/main.go')], { cwd: backend, env: { ...process.env, ...env }, stdio: 'inherit' });
  // Run outside backend checkout so godotenv cannot discover its .env.
  start(executable, [], env, temp);
  await until(async () => { try { return (await fetch('http://127.0.0.1:4174/health')).ok; } catch { return false; } }, 'Go fixture server did not start');
  mkdirSync(resolve(root, 'output/playwright'), { recursive: true });
  writeFileSync(resolve(root, 'output/playwright/fixture.json'), JSON.stringify({ key }));
  const frontendEnv = { ...process.env, VITE_API_URL: 'http://127.0.0.1:4174/api/v1', VITE_SENTRY_DSN: '', SENTRY_AUTH_TOKEN: '' };
  const buildDirectory = resolve(temp, 'panel');
  execFileSync(process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), 'build', '--outDir', buildDirectory, '--emptyOutDir'], { cwd: root, env: frontendEnv, stdio: 'inherit' });
  start(process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), 'preview', '--outDir', buildDirectory, '--host', '127.0.0.1', '--port', '4173', '--strictPort'], frontendEnv);
} catch (err) { console.error(err); await cleanup(1); }

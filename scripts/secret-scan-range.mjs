import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const isSha = value => typeof value === 'string' && /^[a-f\d]{40}(?:[a-f\d]{24})?$/i.test(value);
const checkedSha = value => {
  if (!isSha(value)) throw new Error('Secret scan requires a full commit SHA');
  return value;
};

export function secretScanRange(eventName, event, newBranchBase) {
  if (eventName === 'pull_request') {
    return `${checkedSha(event.pull_request?.base?.sha)}..${checkedSha(event.pull_request?.head?.sha)}`;
  }
  if (eventName !== 'push' || event.deleted) return null;
  const head = checkedSha(event.after);
  const before = checkedSha(event.before);
  if (!/^0+$/.test(before)) return `${before}..${head}`;
  // Scan all reachable commits if the default-branch comparison is unavailable.
  return newBranchBase ? `${checkedSha(newBranchBase)}..${head}` : head;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  let newBranchBase;
  if (process.env.GITHUB_EVENT_NAME === 'push' && /^0+$/.test(event.before ?? '') && !event.deleted) {
    const head = checkedSha(event.after);
    const branch = event.repository?.default_branch;
    if (typeof branch === 'string' && branch) {
      try {
        newBranchBase = execFileSync('git', ['merge-base', `refs/remotes/origin/${branch}`, head], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      } catch { /* An unavailable baseline falls back to a complete history scan. */ }
    }
  }
  const range = secretScanRange(process.env.GITHUB_EVENT_NAME, event, newBranchBase);
  if (range) execFileSync('gitleaks', ['git', '--redact', '--verbose', `--log-opts=${range}`], { stdio: 'inherit' });
}

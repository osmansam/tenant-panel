// The source editor uses Tailwind's default scale. Keep those utilities local
// so the runtime application's custom font sizes, radii and shadows stay intact.
module.exports = {
  content: ['./src/visual-engine/**/*.{ts,tsx,js,jsx}'],
  important: '.ve-utilities',
  darkMode: ['selector', '[data-theme="dark"]'],
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};

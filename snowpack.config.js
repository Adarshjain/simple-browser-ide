module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  scripts: { 'build:css': 'postcss' },
  plugins: ['@snowpack/plugin-vue', '@snowpack/plugin-dotenv'],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};

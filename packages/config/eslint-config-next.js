module.exports = {
  extends: [
    'next/core-web-vitals',
    'turbo',
  ].map(require.resolve),
  rules: {
    // Custom rules can be added here
  },
};

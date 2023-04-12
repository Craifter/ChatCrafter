module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/key-spacing': 'off',
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
    "semi": [1, "always"],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/no-empty-interface": "off"
  },
  ignorePatterns: ['**/*.html', '**/*.js', '**/*.css', '**/*.json'],
}

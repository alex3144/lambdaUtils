module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    mocha: true,
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts"]
      }
    }
  },
  rules: {
    'max-len': [2, 140],
    'import/no-default-export': 1,
    'import/prefer-default-export': 0,
    'import/order': ["error", {"newlines-between": "always"}]
  }
}
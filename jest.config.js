module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // preset: 'ts-jest/presets/js-with-ts',
  transformIgnorePatterns: ['node_modules/(?!(bootstrap-vue)/)'],
}

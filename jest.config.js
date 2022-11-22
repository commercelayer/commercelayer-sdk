/* global module */
module.exports = async () => {
  return {
    verbose: true,
    testMatch: ['**/specs/**/*.spec.[jt]s?(x)'],
    collectCoverageFrom: ['src/**/{!(ignore-me),}.ts']
  }
}

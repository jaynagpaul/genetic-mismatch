/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Workaround for Core-JS and Gatsby
const path = require(`path`)

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const webpackConfig = getConfig()
  delete webpackConfig.resolve.alias["core-js"]

  webpackConfig.resolve.modules = [
    path.resolve(__dirname, "node_modules/gatsby/node_modules"), // for Gatsby's core-js@2
    "node_modules", // your modules w/ core-js@3
  ]
  actions.replaceWebpackConfig(webpackConfig)
}

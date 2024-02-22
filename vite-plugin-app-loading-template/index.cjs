const fs = require('fs')
const path = require('path')
const { load } = require('cheerio')
const sass = require('sass')

function injectKonnectAppLoadingTemplate(rootAppSelector = '#app') {
  return {
    name: 'app-loading-template',
    transformIndexHtml: async (html) => {
      let templateFile = ''

      try {
        templateFile = fs.readFileSync(path.resolve(__dirname, '{PATH FROM PROJECT ROOT TO DIR}/vite-plugin-app-loading-template/template.html'), 'utf8')
      } catch (err) {
        console.log('app-loading-template: could not import and parse the loading template', err)
        return html
      }

      try {
        const $cheerioApp = load(html)
        const appRootElement = $cheerioApp(rootAppSelector)

        if (!appRootElement) {
          return html
        }

        // Loading template
        const $cheerioTemplate = load(templateFile)
        const templateElement = $cheerioTemplate('template')
        const templateStyleElement = $cheerioTemplate('#app-loading-template-styles')

        if (!templateElement || !templateStyleElement) {
          return html
        }

        // Compile the template styles
        const sassResult = await sass.compileAsync(path.resolve(__dirname, '{PATH FROM PROJECT ROOT TO DIR}/vite-plugin-app-loading-template/template.scss'))

        // Inject the styles into the template
        templateStyleElement.html(sassResult.css)

        // Append `div#app` element with template content
        appRootElement.html(templateElement.html())

        // Return the modified HTML
        return $cheerioApp.html()
      } catch (err) {
        console.log('app-loading-template: could not inject template content', err)
        return html
      }
    },
  }
}

module.exports = injectKonnectAppLoadingTemplate

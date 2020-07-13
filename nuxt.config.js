export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  globalName: 'app',


  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/scss/main.scss',
    'locomotive-scroll/dist/locomotive-scroll.min.css'
  ],

  styleResources: {
    scss: ['~/scss/*.scss']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: "~/plugins/locomotiveScroll.js",
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit',
    '@nuxtjs/style-resources'
  ],

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },

  generate: {
    routes() {
      return [
        '/projects/dfns'
      ]
    }
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "http://localhost:1337/graphql"
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

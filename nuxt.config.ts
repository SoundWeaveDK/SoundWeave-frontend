// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@kevinmarrec/nuxt-pwa'
  ],
  pwa: {
    manifest: {
      name: 'SoundWeave',
      short_name: 'SoundWeave',
      lang: 'en',
    },
    meta: {
      mobileAppIOS: true,
    },
    workbox: {
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },
  devServer: { port: 3001 },
  /*   devtools: {
      enabled: true,
  
      timeline: {
        enabled: true,
      },
    }, */
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
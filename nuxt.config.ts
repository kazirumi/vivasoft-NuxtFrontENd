// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // ...
    '@pinia/nuxt',
    'nuxt-mdi'
  ],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    apiURL: process.env.VITE_API_URL,
    public:{
      apiURL: process.env.VITE_API_URL,
    }
  }
})

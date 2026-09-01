import { createApp } from 'vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#C1552D',
          'primary-darken-1': '#9C4423',
          secondary: '#E3A857',
          background: '#FBF6F0',
          surface: '#FFFFFF',
          'on-background': '#2B2420',
          'on-surface': '#2B2420',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      rounded: 'pill',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')

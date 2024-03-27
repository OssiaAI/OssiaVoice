import './assets/main.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
// import 'vuetify/styles'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const OssiaLightTheme = {
  dark: false,
  colors: {
    'primary': '#00b600',
    'text-color-primary': '#ffffff'
  },
  variables: {
  }
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'OssiaLightTheme',
    themes: {
      OssiaLightTheme: OssiaLightTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

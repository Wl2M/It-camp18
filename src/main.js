import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { firestorePlugin} from 'vuefire'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(firestorePlugin)
  .mount('#app')



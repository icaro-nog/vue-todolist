import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
import { makeServer } from './server';

// if (process.env.NODE_ENV === 'development') {
//     makeServer();
// }

const app = createApp(App)

app.use(router);
app.use(store);
app.use(makeServer)
app.mount('#app')

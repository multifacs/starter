import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import { keycloak, updateProfileInfo } from './keycloak';

keycloak.init({onLoad: 'check-sso', responseMode: 'query'}).then((auth) => {
    store.state.authorized = auth
    updateProfileInfo(auth)
    createApp(App).use(store).use(router).use(Antd).mount('#app')
})




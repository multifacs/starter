import Keycloak, { KeycloakConfig, KeycloakInstance } from 'keycloak-js';
import store from './store';

const initOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL, realm: 'my_realm', clientId: 'NetworkRestService'
  } as KeycloakConfig

export const keycloak: KeycloakInstance = Keycloak(initOptions);
let refreshInterval: number | null = null

keycloak.onAuthSuccess = () => {
    store.state.authorized = true
    updateProfileInfo(true)
    refreshInterval = setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
            console.log('Token refreshed' + refreshed);
        } else {
            console.trace('Token not refreshed');
        }
        }).catch((e) => {
            console.error('Failed to refresh token', e);
        });
    }, 6000)
}

function stopRefreshing() {
    clearInterval(refreshInterval?.valueOf())
}

export function updateProfileInfo(auth: boolean) {
    if (auth) {
        store.state.userId = keycloak.tokenParsed!.sub
        store.dispatch("fetchProfileInfo")
    }
}

keycloak.onAuthError = stopRefreshing
keycloak.onAuthLogout = stopRefreshing
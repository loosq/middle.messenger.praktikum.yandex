enum Constants {
    DEFAULT_PORT = 3000,
    BUILD_PATH = 'dist',
    RESOURCES_URL ='https://ya-praktikum.tech/api/v2/resources',
    WS_CHATS_URL = 'wss://ya-praktikum.tech/ws/chats',
    API_URL = 'https://ya-praktikum.tech/api/v2'
}

const URLS = {
    login: '/',
    messenger: '/messenger',
    settings: '/settings',
    signUp: '/sign-up',
    logout: '/logout',
    error: '/error'
}

const MODAL_TIMEOUT = 5000;

module.exports = {Constants, URLS, MODAL_TIMEOUT}

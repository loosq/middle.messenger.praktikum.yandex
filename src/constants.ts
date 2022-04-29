enum Constants {
    DEFAULT_PORT = 3000,
    BUILD_PATH = 'dist',
    RESOURCES_URL ='https://ya-praktikum.tech/api/v2/resources',
    WS_CHATS_URL = 'wss://ya-praktikum.tech/ws/chats'
}

const URLS = {
    login: '/',
    messenger: '/messenger',
    settings: '/settings',
    signUp: '/sign-up',
    logout: '/logout',
    error: '/error'
}

module.exports = {Constants, URLS}

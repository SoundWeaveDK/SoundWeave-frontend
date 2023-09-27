export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            welcome: 'Welcome',
            home: 'Home',
        },
        fr: {
            welcome: 'Bienvenue',
            home: 'Accueil',
        },
        da: {
            welcome: 'Velkommen',
            home: 'Hjem',
        },
    }
}))

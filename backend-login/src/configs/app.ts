interface AppConfig {
    locale: string;
}

const appConfig: AppConfig = {
    locale: process.env.APP_LOCALE || 'en',
};

export default appConfig;

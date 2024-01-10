declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WEB_APP_URL: string; // url
    }
  }
}

export {};

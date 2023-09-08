declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BSKY_SERVICE_URL: string;
      BSKY_AUTH_PASSWORD: string;
      BSKY_AUTH_USERNAME: string;
    }
  }
}

export {};

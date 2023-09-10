import { BskyAgent } from "@atproto/api";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BSKY_SERVICE_URL: string;
      BSKY_AUTH_PASSWORD: string;
      BSKY_AUTH_USERNAME: string;
      FIXBLUESKY_APP_DOMAIN: string;
    }
  }
  interface Env {
    Variables: { Agent: BskyAgent };
  }
}

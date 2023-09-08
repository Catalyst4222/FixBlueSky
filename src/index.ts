import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { BskyAgent } from "@atproto/api";

import { getPost } from "./routes/getPost";
import { getPostData } from "./routes/getPostData";
import { getOEmbed } from "./routes/getOEmbed";
import { getProfileData } from "./routes/getProfileData";
import { getProfile } from "./routes/getProfile";

require("dotenv").config();

const app = new Hono<{ Variables: { Agent: BskyAgent } }>();

app.use("*", async (c, next) => {
  const agent = new BskyAgent({ service: process.env.BSKY_SERVICE_URL });
  await agent.login({
    identifier: process.env.BSKY_AUTH_USERNAME,
    password: process.env.BSKY_AUTH_PASSWORD,
  });
  c.set("Agent", agent);
  return next();
});

app.get("/", (c) => {
  return c.redirect("https://github.com/ThornbushHQ/FixBluesky");
});

app.get("/profile/:user/post/:post", getPost);
app.get("/https://bsky.app/profile/:user/post/:post", getPost);

app.get("/profile/:user/post/:post/json", getPostData);
app.get("/https://bsky.app/profile/:user/post/:post/json", getPostData);

app.get("/profile/:user", getProfile);
app.get("/https://bsky.app/profile/:user", getProfile);

app.get("/profile/:user/json", getProfileData);
app.get("/https://bsky.app/profile/:user/json", getProfileData);

app.get("/oembed", getOEmbed);

console.log("Serving!");
serve({ fetch: app.fetch, port: 80 });

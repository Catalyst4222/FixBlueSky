import { Handler } from "hono";

export enum OEmbedTypes {
  Post = 1,
  Profile,
}

export const getOEmbed: Handler<Env, "/oembed"> = async (c) => {
  const type = +(c.req.query("type") ?? 0);
  const avatar = c.req.query("avatar");

  const defaults = {
    provider_name: "FixBluesky",
    provider_url: "https://bsyy.app/",
    thumbnail_url: avatar,
    thumbnail_width: 1000,
    thumbnail_height: 1000,
  };

  if (type === OEmbedTypes.Post) {
    const { replies, reposts, likes } = c.req.query();
    return c.json({
      author_name: `🗨️ ${replies}    ♻️ ${reposts}    💙 ${likes}`,
      ...defaults,
    });
  }
  if (type === OEmbedTypes.Profile) {
    const { follows, posts } = c.req.query();
    return c.json({
      author_name: `👤 ${follows} followers\n🗨️ ${posts} skeets`,
      ...defaults,
    });
  }
  return c.json(defaults, 400);
};

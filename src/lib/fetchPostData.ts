import { AppBskyFeedGetPosts, BskyAgent } from "@atproto/api";

export interface fetchPostOptions {
  user: string;
  post: string;
}

export async function fetchPost(
  agent: BskyAgent,
  { user, post }: fetchPostOptions,
): Promise<AppBskyFeedGetPosts.Response> {
  const { data: userData } = await agent.getProfile({
    actor: user,
  });
  return await agent.getPosts({
    uris: [`at://${userData.did}/app.bsky.feed.post/${post}`],
  });
}

import { AppBskyActorGetProfile, BskyAgent } from "@atproto/api";

export interface fetchProfileOptions {
  user: string;
}

export async function fetchProfile(
  agent: BskyAgent,
  { user }: fetchProfileOptions,
): Promise<AppBskyActorGetProfile.Response> {
  return await agent.getProfile({
    actor: user,
  });
}

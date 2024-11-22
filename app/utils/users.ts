"use server";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export async function fetchUser(username: string) {
  const response = await fetch(`${BASE_URL}/user/${username}.json`);
  return response.json();
}

export async function fetchUserStories(ids: number[], limit = 10) {
  const storyIds = ids.slice(0, limit);

  return Promise.all(
    storyIds.map(async (id) => {
      const response = await fetch(`${BASE_URL}/item/${id}.json`);
      return response.json();
    })
  );
}

export async function fetchUserComments(ids: number[], limit = 10) {
  const commentIds = ids.slice(0, limit);

  const comments = await Promise.all(
    commentIds.map(async (id) => {
      const response = await fetch(`${BASE_URL}/item/${id}.json`);
      const comment = await response.json();

      if (comment.type === "comment") {
        const storyResponse = await fetch(`${BASE_URL}/item/${comment.parent}.json`);
        const story = await storyResponse.json();
        return {
          ...comment,
          story_title: story.title,
          story_url: story.url,
        };
      }
      return null;
    })
  );

  return comments.filter((comment) => comment !== null);
}

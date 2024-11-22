// Base URL for the Hacker News Firebase API
"use server";
const BASE_URL = "https://hacker-news.firebaseio.com/v0";

/**
 * Fetches user's information from the Hacker News API
 * @param {string} username - username
 * @returns {Promise<Object>} User data including karma, submitted stories/comments, etc.
 */
export async function fetchUser(username: string) {
  const response = await fetch(`${BASE_URL}/user/${username}.json`);
  return response.json();
}

/**
 * Fetches stories submitted by a user
 * @param {number[]} ids - Array of story IDs to fetch for a user
 * @param {number} [limit=10] - Maximum number of stories to retrieve
 * @returns {Promise<Array>} Array of story objects containing title, url, etc.
 */
export async function fetchUserStories(ids: number[], limit = 10) {
  const storyIds = ids.slice(0, limit);

  return Promise.all(
    storyIds.map(async (id) => {
      const response = await fetch(`${BASE_URL}/item/${id}.json`);
      return response.json();
    })
  );
}

/**
 * Fetches comments made by a user and injects story context
 * @param {number[]} ids - Array of comment IDs to fetch
 * @param {number} [limit=10] - Maximum number of comments to retrieve
 * @returns {Promise<Array>} Array of comment objects with additional story context
 *
 * @remarks
 * Each comment is injected with:
 * - story_title: Title of the story the comment belongs to
 * - story_url: URL of the story the comment belongs to
 */
export async function fetchUserComments(ids: number[], limit = 10) {
  const commentIds = ids.slice(0, limit);

  const comments = await Promise.all(
    commentIds.map(async (id) => {
      const response = await fetch(`${BASE_URL}/item/${id}.json`);
      const comment = await response.json();

      // Only process items that are comments
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

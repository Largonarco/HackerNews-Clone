// Base URL for the Hacker News Firebase API
const BASE_URL = "https://hacker-news.firebaseio.com/v0";

/**
 * Fetches paginated stories from Hacker News
 * @param {('top'|'best'|'new')} type - Type of stories to fetch
 * @param {number} page - Current page number (1-based)
 * @param {number} pageSize - Number of stories per page
 * @returns {Promise<{stories: any[], totalPages: number}>} Stories and pagination info
 */
export const fetchStories = async (
  type: "top" | "best" | "new",
  page: number,
  pageSize: number
) => {
  // Fetch all story IDs for the given type
  const response = await fetch(`${BASE_URL}/${type}stories.json`);
  const storyIds = await response.json();

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageStoryIds = storyIds.slice(start, end);

  const stories = await Promise.all(
    pageStoryIds.map(async (id: number) => {
      const storyResponse = await fetch(`${BASE_URL}/item/${id}.json`);
      return storyResponse.json();
    })
  );

  return {
    stories,
    totalPages: Math.ceil(storyIds.length / pageSize),
  };
};

/**
 * Fetches a single story by ID
 * @param {number} id - Story ID
 * @returns {Promise<any>} Story object
 */
export const fetchStory = async (id: number) => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
};

/**
 * Fetches multiple comments for a story by their IDs
 * @param {number[]} ids - Array of comment IDs
 * @returns {Promise<any[]>} Array of comment objects
 */
export async function fetchComments(ids: number[]) {
  return Promise.all(
    ids.map(async (id) => {
      const response = await fetch(`${BASE_URL}/item/${id}.json`);
      return response.json();
    })
  );
}

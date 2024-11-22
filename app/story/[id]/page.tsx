import Stories from "../../components/Stories";
import Comments from "../../components/Comments";

import { fetchStory, fetchComments } from "../../utils/stories";

export default async function Story({ params }: { params: { id: string } }) {
  const { id } = await params;
  const story = await fetchStory(parseInt(id));
  const comments = story.kids ? await fetchComments(story.kids) : [];

  return (
    <div>
      <div className="mb-8">
        <Stories stories={[story]} />
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Comments</h2>

        {comments.length > 0 ? <Comments comments={comments} /> : <p>No comments</p>}
      </div>
    </div>
  );
}

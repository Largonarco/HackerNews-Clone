import Stories from "../../components/Stories";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchUser, fetchUserStories } from "../../utils/users";

dayjs.extend(relativeTime);

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const user = await fetchUser(username);
  const userStories = await fetchUserStories(user.submitted);

  return (
    <div>
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold mb-4">{user.id}</h1>

        <div>
          <p className="mb-2">Karma: {user.karma}</p>
          <p>Joined: {dayjs.unix(user.created).fromNow()}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Submissions</h2>

        <Stories stories={userStories} />
      </div>
    </div>
  );
}

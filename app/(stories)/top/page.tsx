import Stories from "../../components/Stories";
import Pagination from "../../components/Pagination";

import { fetchStories } from "../../utils/stories";

export default async function TopStories({ searchParams }: { searchParams: { page: string } }) {
  const pageSize = 10;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { stories, totalPages } = await fetchStories("top", page, pageSize);

  return (
    <div>
      <Stories stories={stories} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}

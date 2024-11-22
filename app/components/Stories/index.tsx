import Story from "./Story";

import { StoriesProps } from "@/app/types";

const Stories = ({ stories }: StoriesProps) => {
  return (
    <ul className="space-y-4">
      {stories.map((story) => (
        <Story story={story} key={story.id} />
      ))}
    </ul>
  );
};

export default Stories;

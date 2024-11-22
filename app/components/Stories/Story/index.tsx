"use client";

import Link from "next/link";

import dayjs from "dayjs";
import { StoryProps } from "@/app/types";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Story = ({ story }: StoryProps) => {
  return (
    <li key={story.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white hover:underline">
          {story.title}
        </a>
      </h2>

      {!story.url && story.text && (
        <div
          className="mt-2 mb-4 text-gray-800 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: story.text }}></div>
      )}

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {story.score} points by{" "}
        <Link href={`/user/${story.by}`} className="hover:underline">
          {story.by}
        </Link>{" "}
        | {dayjs.unix(story.time).fromNow()} |{" "}
        <Link href={`/story/${story.id}`} className="hover:underline">
          comments
        </Link>
      </p>
    </li>
  );
};

export default Story;

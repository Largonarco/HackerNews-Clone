export interface IStory {
  id: number;
  by: string;
  url: string;
  time: number;
  text: string;
  score: number;
  title: string;
}

export interface StoryProps {
  story: IStory;
}

export interface StoriesProps {
  stories: IStory[];
}

export interface IComment {
  id?: number;
  by?: string;
  time?: number;
  text?: string;
  kids?: number[];
  parent?: number;
}

export interface CommentProps {
  depth?: number;
  comment: IComment;
  fetchReplies: (ids: number[]) => Promise<Comment[]>;
}

export interface CommentsProps {
  comments: IComment[];
}

export interface PaginationProps {
  totalPages: number;
}

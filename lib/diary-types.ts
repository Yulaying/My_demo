export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type DiaryInput = {
  title: string;
  content: string;
};

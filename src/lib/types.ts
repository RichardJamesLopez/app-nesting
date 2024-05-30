export type CommentType = {
  id: number;
  content: string;
  parentId: number | null;
  createdAt: Date;
  dealId: string;
  organizationId: string;
  totalVote: number | null;
  userReaction: boolean | null;
  user: {
    id: string;
    name?: string;
    image?: string;
  };
  replies: {
    id: number;
    content: string;
    parentId: number | null;
    createdAt: Date;
    dealId: string;
    organizationId: string;
    totalVote: number | null;
    userReaction: boolean | null;
    user: {
      id: string;
      name?: string;
      image?: string;
    };
  }[];
};

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
};

export type StringType = {
  id: string;
  stringCount: string;
};

export type GuitarType = {
  id: string;
  title: string;
  type: string
};

export type Comment = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

export type CommentPost = Omit<Comment, 'createAt' | 'id'>

export type CommentData = Omit<CommentPost, 'guitarId'>

export type Product = Guitar & { comments: Comment[] };

export type Order = {
  guitarsIds: number[],
  coupon: null | string
};

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
};

export type Comment = {
  id: string;
  userName: string;
  advantages: string;
  disadvantages: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

export type Product = Guitar & { comments: Comment[] };

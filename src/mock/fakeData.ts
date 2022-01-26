import { customAlphabet } from 'nanoid';
import { name, random, image, datatype, lorem, date, commerce } from 'faker';
import { Comment, Guitar } from '../types/data';
const nanoid = customAlphabet('1234567890', 5);

const STRINGS: number[] = [4, 6, 7, 12];
const TYPES: string[] = ['ukulele', 'acoustic', 'electric'];
const COMMENT_ID = 1;
const COMMENTS_LENGTH = 5;
const PRODUCTS_LENGTH = 10;

export const CreateFakeGuitar = (): Guitar => ({
  id: parseInt(nanoid(), 10),
  name: name.firstName(),
  description: lorem.sentences(datatype.number(3)),
  rating: datatype.float({ max: 5 }),
  price: Number(commerce.price()),
  vendorCode: lorem.word(),
  type: random.arrayElement(TYPES),
  previewImg: image.imageUrl(),
  stringCount: random.arrayElement(STRINGS),
});

export const CreateFakeComment = (): Comment => ({
  guitarId: COMMENT_ID,
  userName: name.firstName(),
  advantage: lorem.word(),
  disadvantage: lorem.word(),
  comment: lorem.sentences(datatype.number(3)),
  rating: datatype.float({ max: 5 }),
  createAt: date.past().toString(),
  id: nanoid(),
});

export const fakeComments = new Array(COMMENTS_LENGTH)
  .fill(null)
  .map(CreateFakeComment);

export const fakeGuitars = new Array(PRODUCTS_LENGTH)
  .fill(null)
  .map(CreateFakeGuitar);

export const fakeProduct = { ...CreateFakeGuitar(), comments: fakeComments };

export const fakeProducts = new Array(PRODUCTS_LENGTH)
  .fill(null)
  .map((element) => element = { ...CreateFakeGuitar(), comments: fakeComments });

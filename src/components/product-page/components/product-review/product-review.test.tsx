import { render, screen } from '@testing-library/react';
import { TestID } from '../../../../const-test';
import { CreateFakeComment } from '../../../../mock/fakeData';
import ProductReview from './product-review';


const fakeComment = {...CreateFakeComment(),
  userName: 'user',
  rating: 4,
  advantage: 'advantage',
  disadvantage: 'disadvantage',
  comment: 'comment',
};

describe('Component: ProductReview', () => {
  it('should render correctly', () => {
    render(<ProductReview review={fakeComment}/>);
    expect(screen.getByText(`${fakeComment.userName}`)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestID.FullStar).length).toEqual(Math.floor(fakeComment.rating));
    expect(screen.getByText(`${fakeComment.advantage}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.disadvantage}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.comment}`)).toBeInTheDocument();
  });
});

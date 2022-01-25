import { customRender } from '../../../render-test';
import ScrollToTop from './scroll-to-top';

window.scrollTo = jest.fn();

describe('Component: ScrollToTop', () => {
  it('should window.scrollTo to be called', () => {
    customRender(<ScrollToTop/>);
    expect(window.scrollTo).toBeCalledTimes(1);
  });
});

import { fakeComments, fakeGuitars } from '../../../../mock/fakeData';
import { api } from '../../../../services/api';
import CatalogCards from './catalog-cards';
import { screen} from '@testing-library/react';
import { AxiosResponse } from 'axios';
import { TestReg } from '../../../../const-test';
import { customRenderWithProvider } from '../../../../render-test';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';

const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, productsShow: fakeGuitars, isLoading: false},
  USER: MockUSER,
};
const store = mockStore(componentState);

describe('Component: CatalogCards', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render all product cards correctly', async () => {
    const fakeAxiosResponse = {
      data: fakeComments,
    } as AxiosResponse;
    jest.spyOn(api, 'get').mockResolvedValue(fakeAxiosResponse);
    customRenderWithProvider(<CatalogCards/>, store);
    expect(screen.queryByText(TestReg.AboutProduct)).not.toBeInTheDocument();
    expect(await (await screen.findAllByText(TestReg.AboutProduct)).length).toEqual(fakeGuitars.length);
  });
});

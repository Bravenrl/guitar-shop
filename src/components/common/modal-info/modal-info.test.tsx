import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ModalInfo from './modal-info';
import { CreateFakeGuitar } from '../../../mock/fakeData';
import { MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import { GuitarsType } from '../../../const';

const fakeCurrentProduct = CreateFakeGuitar();
const mockStore = configureMockStore();
const componentState = {
  DATA: { ...MockDATA, tempItemCart: fakeCurrentProduct },
  USER: MockUSER,
};
const store = mockStore(componentState);
const fakeProductType = GuitarsType.get(fakeCurrentProduct.type)?.type;

describe('Component: ModalInfo', () => {
  it('should render & swich correctly', () => {
    customRenderWithProvider(<ModalInfo />, store);
    expect(screen.getByAltText(`${fakeCurrentProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Гитара ${fakeCurrentProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeCurrentProduct.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeProductType}, ${fakeCurrentProduct.stringCount} струнная`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCurrentProduct.price} ₽`)).toBeInTheDocument();
  });
});

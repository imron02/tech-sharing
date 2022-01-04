import 'react-native';
import React from 'react';
import App from '../App';
import {render, waitFor} from '@testing-library/react-native';
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

it('renders correctly', async () => {
  const {getByTestId} = render(<App />);
  const component = getByTestId('loader');

  await waitFor(() => {
    expect(component).toBeTruthy();
  });
});

describe('app stack', () => {
  test('render login screen', async () => {
    const {findByText} = render(<App />);
    const component = await findByText('Login');

    expect(component).toBeTruthy();
  });
  test('render home screen', async () => {
    AsyncStorageMock.getItem = jest.fn(() => Promise.resolve('secret'));
    const {queryAllByText} = render(<App />);
    await waitFor(async () => {
      const component = await queryAllByText('Home');
      expect(component).toBeTruthy();
    });
  });
});

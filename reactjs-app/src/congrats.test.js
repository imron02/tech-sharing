import {render, screen} from '@testing-library/react';
import Congrats from './Congrats';

test('renders without error', () => {
  render(<Congrats />);
  const component = screen.getByTestId('component-congrats');
  expect(component).toBeInTheDocument();
});
test('renders no text when `success` is false', () => {
  render(<Congrats />);
  const component = screen.getByTestId('component-congrats');
  expect(component).toBeEmptyDOMElement();
});
test('renders non-empty congrats message when `success` is true', () => {
  render(<Congrats success />);
  const component = screen.queryByText(/Selamat! Kamu menebak katanya/);
  expect(component).toBeInTheDocument();
});

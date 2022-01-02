import {render, screen} from '@testing-library/react';
import GuessedWords from './GuessedWords';

const setup = (guestWords = []) => render(
  <GuessedWords
    guessedWords={guestWords}
  />
);

describe('if there are no words guessed', () => {
  test('renders without error', () => {
    setup();
    const component = screen.getByTestId('component-guessed-words');
    expect(component).toBeInTheDocument();
  });
  test('renders instructions to guess a word', () => {
    setup();
    const instructions = screen.getByText(/Coba tebak kata rahasianya!/i);
    expect(instructions).toBeInTheDocument();
  });
});

describe('if there are words guessed', () => {
  const guessedWords = [
    {guessedWord: 'train', letterMatchCount: 3},
    {guessedWord: 'agile', letterMatchCount: 1},
    {guessedWord: 'party', letterMatchCount: 5},
  ];
  test('renders "guessed words" section', () => {
    setup(guessedWords);
    const component = screen.getByTestId('guessed-words');
    expect(component).toBeInTheDocument();
  });
  test('correct number of guessed words', () => {
    setup(guessedWords);
    const table = screen.queryAllByTestId( 'guessed-word');
    expect(table).toHaveLength(guessedWords.length);
  });
});

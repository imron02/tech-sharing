import React from 'react';

export default function GuessedWords ({ guessedWords }) {
  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span>
        Coba tebak kata rahasianya!
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-testid="guessed-word" key={ index }>
        <td>{ word.inputWords }</td>
        <td>{ word.letterMatchCount }</td>
      </tr>
    ));
    contents = (
      <div data-testid="guessed-words">
        <h3>Tebakan</h3>
        <table className="table table-sm">
          <thead className="thead-light">
          <tr>
            <th>Kata</th>
            <th>Huruf yang cocok</th>
          </tr>
          </thead>
          <tbody>
          { guessedWordsRows }
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div data-testid="component-guessed-words">
      { contents }
    </div>
  );
};

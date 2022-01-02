import React from 'react';
import {getLetterMatchCount} from './helper/getLetterMatchCount';

export default function Input ({secretWord, inputWords, setInputWords, setSuccess}) {
  const [currentGuess, setCurrentGuess] = React.useState("");

  return (
    <div data-testid='component-input'>
      <form className="form-inline">
        <input
          className="mb-2 mx-sm-3 form-control"
          type="text"
          placeholder="Masukkan kata"
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          onClick={(evt) => {
            evt.preventDefault();
            const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
            const newGuessedWords = [
              ...inputWords,
              { inputWords: currentGuess, letterMatchCount }
            ]
            setInputWords(newGuessedWords);

            // check against secretWord and update success if necessary
            if (currentGuess === secretWord) setSuccess(true);

            // clear input box
            setCurrentGuess("");
          }}
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

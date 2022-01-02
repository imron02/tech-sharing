import {useEffect, useState} from 'react';
import {getRandomWord} from './api/get_random_words';
import Input from './input';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';

function App () {
  const [words, setWords] = useState('');
  const [inputWords, setInputWords] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getWords = async () => {
      const response = await getRandomWord();
      // console.log(response);
      setWords(String(response));
    }

    getWords();
  }, []);

  return (
    <div className="container" data-testid="app">
      <div className="row text-center mt-5">
        <div className="col">
          <Congrats success={success} />
          <h1>Tebak Kata</h1>
          <Input
            secretWord={words}
            inputWords={inputWords}
            setInputWords={setInputWords}
            setSuccess={setSuccess} />
        </div>
        <GuessedWords guessedWords={inputWords} />
      </div>
    </div>
  );
}

export default App;

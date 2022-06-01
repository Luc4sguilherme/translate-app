import { useCallback, useEffect, useState } from 'react';

import Arrows from './components/Arrows';
import Modal from './components/Modal';
import SendButton from './components/SendButton';
import TextBox from './components/TextBox';
import api from './services/api';
import type { Language } from './type/language';

function App() {
  const [inputLanguage, setInputLanguage] = useState('English');
  const [outputLanguage, setOutputLanguage] = useState('Portuguese');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const getLanguages = useCallback(async () => {
    const response = await api.get('/languages');

    setLanguages(response.data);
  }, []);

  function handleClick() {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  const translate = async () => {
    const data = {
      textToTranslate,
      outputLanguage,
      inputLanguage,
    };

    const response = await api.post('/translation', data);

    setTranslatedText(response.data);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <div className="App">
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === 'input' ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === 'input' ? setInputLanguage : setOutputLanguage
          }
        />
      ) : (
        <>
          <TextBox
            type="input"
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />

          <Arrows onClick={() => handleClick()} />

          <TextBox
            type="output"
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
          />

          <SendButton onClick={translate} />
        </>
      )}
    </div>
  );
}

export default App;

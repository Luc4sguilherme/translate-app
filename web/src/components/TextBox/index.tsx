import SelectDropDown from '../SelectDropDown';

import './styles.css';

type TextBoxProps = {
  type: 'input' | 'output';
  selectedLanguage: string;
  setShowModal: React.Dispatch<React.SetStateAction<string | null>>;
  setTextToTranslate?: React.Dispatch<React.SetStateAction<string>>;
  setTranslatedText?: React.Dispatch<React.SetStateAction<string>>;
  textToTranslate?: string;
  translatedText?: string;
};

function TextBox({
  type,
  selectedLanguage,
  textToTranslate,
  translatedText,
  setShowModal,
  setTextToTranslate,
  setTranslatedText,
}: TextBoxProps) {
  function handleClick() {
    setTextToTranslate?.('');
    setTranslatedText?.('');
  }

  return (
    <div className={type}>
      <SelectDropDown
        selectedLanguage={selectedLanguage}
        type={type}
        setShowModal={setShowModal}
      />
      <textarea
        placeholder={type === 'input' ? 'Enter Text' : 'Translation'}
        disabled={type === 'output'}
        onChange={event => setTextToTranslate?.(event.target.value)}
        value={type === 'input' ? textToTranslate : translatedText}
      />
      {type === 'input' && (
        <button type="button" className="delete" onClick={handleClick}>
          ˟
        </button>
      )}
    </div>
  );
}

export default TextBox;

import { useState } from 'react';

import type { Language } from '../../type/language';

import './styles.css';

type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<string | null>>;
  setChosenLanguage: React.Dispatch<React.SetStateAction<string>>;
  chosenLanguage: string;
  languages: Language[];
};

function Modal({
  setShowModal,
  setChosenLanguage,
  chosenLanguage,
  languages,
}: ModalProps) {
  const [searchedLanguage, setSearchedLanguage] = useState('');

  const filteredLanguages = languages.filter(language => {
    return language.name
      .toLowerCase()
      .startsWith(searchedLanguage.toLowerCase());
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchedLanguage(event.target.value);
  }

  function closeModal() {
    setShowModal(null);
  }

  function handleClick(event: any) {
    setChosenLanguage(event?.target.textContent);
    setShowModal(null);
  }

  return (
    <div className="option-list">
      <div className="search-bar">
        <input type="" onChange={handleChange} value={searchedLanguage} />
        <button type="button" className="close-button" onClick={closeModal}>
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <div className="option-container">
        <ul>
          {filteredLanguages.map((filteredLanguage: Language) => (
            <div className="list-item" key={filteredLanguage.name}>
              <div className="icon">
                {chosenLanguage === filteredLanguage.name ? '✓' : ''}
              </div>
              <li>
                <button
                  type="button"
                  onClick={handleClick}
                  style={{
                    color:
                      chosenLanguage === filteredLanguage.name
                        ? '#8ab4f8'
                        : undefined,
                  }}
                >
                  {filteredLanguage.name}
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Modal;

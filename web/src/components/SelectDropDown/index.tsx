import './styles.css';

type SelectDropDownProps = {
  type: 'input' | 'output';
  selectedLanguage: string;
  setShowModal: React.Dispatch<React.SetStateAction<string | null>>;
};

function SelectDropDown({
  type,
  setShowModal,
  selectedLanguage,
}: SelectDropDownProps) {
  return (
    <button
      type="button"
      className="select-drop-down"
      onClick={() => setShowModal(type)}
    >
      <input value={selectedLanguage} />
      <div className="down-arrow">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </button>
  );
}

export default SelectDropDown;

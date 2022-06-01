import './styles.css';

type SendButtonProps = {
  onClick: () => void;
};

function SendButton({ onClick }: SendButtonProps) {
  return (
    <button type="button" onClick={onClick} className="send-button">
      ➔
    </button>
  );
}

export default SendButton;

import trashIcon from "@/assets/icons/trash.svg";
import styles from "./DeleteButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

function DeleteButton({ onClick, disabled, ...props }: Props) {
  return (
    <button className={styles.btn} onClick={onClick} disabled={disabled} {...props}>
      <span>Видалити</span>
      <svg>
        <use xlinkHref={trashIcon.src} />
      </svg>
    </button>
  );
}
export default DeleteButton;

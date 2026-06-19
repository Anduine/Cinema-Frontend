import pencilIcon from "@/assets/icons/pencil.svg";
import styles from "./EditButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

function EditButton({ onClick, disabled, ...props }: Props) {
  return (
    <button className={styles.btn} onClick={onClick} disabled={disabled} {...props}>
      <span>Редагувати</span>
      <svg>
        <use xlinkHref={pencilIcon.src} />
      </svg>
    </button>
  );
}
export default EditButton;

import styles from "../styles/Enunciado.module.css";

interface EnunciadoPops {
  texto: string;
}

export default function Enunciado(props: EnunciadoPops) {
  return (
    <div className={styles.enunciado}>
      <div className={styles.texto}>{props.texto}</div>
    </div>
  );
}

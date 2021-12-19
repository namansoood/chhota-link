import styles from "./ResultWrapper.module.css";

export default function ResultLoader(props) {

    return <div className={styles.main}>
        <div className={styles.header}>Your Links</div>
        <div ref={props.fwdRef} className={styles.content}>{props.children}</div>
    </div>
}
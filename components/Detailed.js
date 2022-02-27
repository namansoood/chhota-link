
import styles from "./Detailed.module.css"


export default function MainPage(props) {
    return <div className={styles.wrapper}>
        {JSON.stringify(props.data, null, 4)}
    </div>
}
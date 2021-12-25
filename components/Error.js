import styles from "./Error.module.css"
import * as Unicons from '@iconscout/react-unicons';

export default function (props) {
    return props.error ? <div className={styles.wrapper}>
        <Unicons.UilExclamationTriangle size={20} />
        <div>{props.error}</div>
    </div> : null
}
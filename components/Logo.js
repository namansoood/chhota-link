import styles from "./Logo.module.css"
import * as Unicons from '@iconscout/react-unicons';

export default function (props) {
    return <a href={"https://google.com/search?q=chhota+meaning"} target={"_blank"}><div className={styles.wrapper}>
        <Unicons.UilLinkBroken size={32} />
        <div>Chhota Link</div>
    </div></a>
}
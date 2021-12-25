import React, { useEffect, useState } from 'react';
import styles from "./Toggle.module.css";

export default function Toggle(props) {
    let [value, setValue] = useState(props.value)

    useEffect(() => {
        let callback = props.onChange || function (b) { }
        callback(value)
    }, [value])

    return <>
        <label value={value} className={styles.wrapper} tabIndex="0">
            <div className={styles.switch}>
                <input type="checkbox" className={styles.checkbox} value={value} onChange={(e) => {
                    setValue(!value)
                }} />
                <div className={styles.handle} />
            </div>
            <span className={styles.label}>{props.label}</span>
        </label>
    </>
}
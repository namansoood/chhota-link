import React, { useState } from "react"
import styles from "./Form.module.css"

export default function (props) {
    let [value, setValue] = useState(undefined)

    return <>
        <form className={styles.form} onSubmit={e => {
            e.preventDefault()
            props.onSubmit(value)
        }}>
            <input className={styles.input} onChange={e => setValue(e.currentTarget.value)} />
            <button type="submit" className={styles.button}>Do Your Magic</button>
        </form>
    </>
}
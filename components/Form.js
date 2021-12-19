import React, { useState } from "react"
import styles from "./Form.module.css"

export default function (props) {
    let [value, setValue] = useState("")

    return <>
        <form className={styles.form} onSubmit={e => {
            e.preventDefault()
            if (value !== "") {
                props.onSubmit(value)
                setValue("")
            }
        }}>
            <input className={styles.input} onChange={e => setValue(e.currentTarget.value)} value={value} placeholder="Paste a link to shorten it" />
            <button type="submit" className={styles.button}>Do Your Magic</button>
        </form>
    </>
}
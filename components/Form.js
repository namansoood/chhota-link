import React, { useState, useRef } from "react"
import styles from "./Form.module.css"

export default function (props) {
    let [value, setValue] = useState("")
    let inputRef = useRef(null)

    return <>
        <form className={styles.form} onSubmit={e => {
            e.preventDefault();
            if (value !== "") {
                props.onSubmit(value);
                setValue("");
            }
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        }}>
            <input ref={inputRef} className={styles.input} onChange={e => setValue(e.currentTarget.value)} value={value} placeholder="Paste a link to shorten it" />
            <button type="submit" className={styles.button}>Do Your Magic</button>
        </form>
    </>
}
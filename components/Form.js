import React, { useState, useRef, useEffect } from "react"
import styles from "./Form.module.css"

import Toggle from "./Toggle"

export default function (props) {
    let [long, setLong] = useState("")
    let [private_, setPrivate] = useState(false)
    let inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    return <>
        <form className={styles.form} onClick={e => inputRef.current.focus()} onSubmit={e => {
            e.preventDefault();
            if (long !== "") {
                props.onSubmit(long, private_);
                setLong("");
            }
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        }}>
            <input ref={inputRef} className={styles.input} onChange={e => setLong(e.currentTarget.value)} value={long} placeholder="Paste a link to shorten it" />
            <div>
                <div className={styles.toggle}><Toggle label={private_ ? "Private" : "Public"} onChange={value => { setPrivate(value) }} /></div>
                <button type="submit" className={styles.button}>Do Your Magic</button>
            </div>
        </form>
    </>
}
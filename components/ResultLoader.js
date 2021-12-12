import React, { useEffect, useState } from 'react';
import styles from "./ResultLoader.module.css"

export default function ResultLoader(props) {
    let [loading, setLoading] = useState(false)
    let [state, setState] = useState(undefined)

    let run = () => {
        setState(undefined);
        if (props.url) {
            setLoading(true)
            fetch("/api/get?url=" + props.url).then(res => res.json().then(json => setState(json)))
        }
    }

    useEffect(run, [])
    useEffect(run, [props.url])

    return (state || loading ? <div className={styles.main}> {state ? <>{JSON.stringify(state)}</> : <>Loading...</>
    }</div > : <></>)
}
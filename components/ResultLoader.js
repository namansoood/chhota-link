import React, { useEffect, useState } from 'react';
import styles from "./ResultLoader.module.css";
import { toAbsoluteUrl } from "../utils/record";

import copy from 'copy-to-clipboard';
import * as Unicons from '@iconscout/react-unicons';

export default function ResultLoader(props) {
    let [loading, setLoading] = useState(false)
    let [state, setState] = useState(undefined)
    let [copied, setCopied] = useState(false)

    let run = () => {
        setState(undefined);
        if (props.url) {
            setLoading(true)
            fetch("/api/get?url=" + props.url).then(res => res.json().then(json => setState(json)))
        }
    }

    useEffect(run, [])
    useEffect(run, [props.url])
    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 1500)
        }
    }, [copied])

    return (state || loading ?
        <div className={styles.main}>
            {
                state ?
                    <>
                        {state.destination} {' = '} <a href={"/" + state.hashed}>{toAbsoluteUrl(state)}</a>
                        <button
                            className={styles.button}
                            onClick={e => {
                                setCopied(true);
                                copy(toAbsoluteUrl(state))
                            }}>
                            {!copied ? <Unicons.UilCopy size={16} /> : <Unicons.UilCheck size={16} />}
                        </button>
                    </>
                    :
                    <>Loading...</>
            }</div > : <></>)
}
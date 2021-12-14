import React, { useEffect, useState } from 'react';
import styles from "./ResultLoader.module.css";
import { toAbsoluteUrl } from "../utils/record";

import copy from 'copy-to-clipboard';
import * as Unicons from '@iconscout/react-unicons';

export default function ResultLoader(props) {
    let [loading, setLoading] = useState(false)
    let [data, setData] = useState(undefined)
    let [error, setError] = useState(undefined)
    let [copied, setCopied] = useState(false)

    let run = () => {
        setData(undefined);
        setError(undefined);
        if (!props.url || props.url === "") {
            return null;
        } else {
            setLoading(true)
            fetch("/api/get?url=" + props.url)
                .then(res => {
                    setLoading(false);
 if (res.code === 200) {
                    res.json().then(json => {
                       
                            setData(json)
                        
                    })
} else {res.json().then(json => {
                            console.log("ERROR:", json.message)
                            setError(json.message)
                      } ).catch(_ => setError("Something went wrong")))} }
                })
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

    return (data || loading || error ?
        <div className={styles.main}>
            {
                data || error ?
                    data ? <>
                        <a href={"/" + data.hashed}>{toAbsoluteUrl(data)}</a>
                        <button
                            className={styles.button}
                            onClick={e => {
                                setCopied(true);
                                copy(toAbsoluteUrl(data))
                            }}>
                            {!copied ? <Unicons.UilCopy size={16} /> : <Unicons.UilCheck size={16} />}
                        </button>
                    </> : error ? <>{error}</> : null
                    : <>Loading...</>
            }</div > : null)
}
import React, { useEffect, useState } from 'react';
import styles from "./ResultLoader.module.css";
import { toAbsoluteUrl } from "../utils/record";

import Trend from "react-trend"

import copy from 'copy-to-clipboard';
import * as Unicons from '@iconscout/react-unicons';

export default function ResultLoader(props) {
    let [loading, setLoading] = useState(false)
    let [data, setData] = useState(undefined)
    let [error, setError] = useState(undefined)
    let [copied, setCopied] = useState(false)

    let trend = Array.from({ length: 10 }, () => Math.floor(Math.random() * 9));;

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
                    if (res.status === 200) {
                        res.json().then(json => {
                            setData(json)
                        }).catch(_ => setError("Something went wrong"))
                    } else {
                        res.json().then(json => {
                            setError(json.message)
                        }).catch(_ => setError("Something went wrong"))
                    }
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
            <div className={styles.icon}>
                {data || error ? (data ? null : <Unicons.UilExclamationTriangle size={20} />) : <Unicons.UilSpinnerAlt className={styles.spinner} size={20} />}
            </div>
            {
                data || error ?
                    data ? <>
                        <div className={styles.short}>
                            <a href={"/" + data.hashed}>{toAbsoluteUrl(data)}</a>
                        </div>
                        <div className={styles.trend}>
                            <Trend
                                smooth
                                autoDraw
                                autoDrawDuration={3000}
                                autoDrawEasing="ease-out"
                                data={trend}
                                gradient={['#4743FF', '#8B62FF']}
                                radius={10}
                                strokeWidth={6}
                                strokeLinecap={'butt'} />
                        </div>
                        <div className={styles.copy}>
                            <button
                                className={styles.button}
                                onClick={e => {
                                    setCopied(true);
                                    copy(toAbsoluteUrl(data))
                                }}>
                                {!copied ? <Unicons.UilCopy size={20} /> : <Unicons.UilCheck size={20} />}
                            </button>
                        </div>
                    </> : error ? <><div>{error}</div></> : null
                    : <> <div>Loading...</div></>
            }
        </div>
        : null)
}
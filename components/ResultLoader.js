import React, { useEffect, useState } from 'react';
import styles from "./ResultLoader.module.css";
import * as Unicons from '@iconscout/react-unicons';
import Result from './Result';

import { getByUrl } from '../utils/api';

export default function ResultLoader(props) {
    let [loading, setLoading] = useState(false)
    let [data, setData] = useState(undefined)
    let [error, setError] = useState(undefined)

    let run = () => {
        setData(undefined);
        setError(undefined);
        if (!props.url || props.url === "") {
            return null;
        } else {
            setLoading(true)
            getByUrl(props.url)
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

    let renderLoader = () => {
        return <div className={styles.loader}>
            <div className={styles.icon}>
                {data || error ? (data ? null : <Unicons.UilExclamationTriangle size={20} />) : <Unicons.UilSpinnerAlt className={styles.spinner} size={20} />}
            </div>
            <div>{error ? { error } : "Loading..."}</div>
        </div>
    }

    return (data || loading || error ?
        <div className={styles.main}>
            {data ? <Result data={data} /> : renderLoader()}
        </div>
        : null)
}
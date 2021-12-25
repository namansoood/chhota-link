import React, { useEffect, useState } from 'react';
import styles from "./Result.module.css";
import { toAbsoluteUrl, getWeeklyTrend } from "../utils/record";

import Trend from "react-trend"

import copy from 'copy-to-clipboard';
import * as Unicons from '@iconscout/react-unicons';

export default function Result(props) {
    let [copied, setCopied] = useState(false)
    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 1500)
        }
    }, [copied])

    function renderTrendGraph() {
        let data = getWeeklyTrend(props.data)

        return <Trend
            smooth
            autoDraw
            autoDrawDuration={1500}
            autoDrawEasing="ease-out"
            data={data}
            gradient={['#4743FF', '#8B62FF']}
            radius={10}
            strokeWidth={8}
            strokeLinecap={'butt'} />
    }

    return <div className={styles.main}>
        <div className={styles.long}>
            <a href={props.data.destination}>{props.data.destination}</a>
        </div>
        <div className={styles.short}>
            <a href={"/" + props.data.hashed}>{toAbsoluteUrl(props.data)}</a>
        </div>
        <div className={styles.trend} title="Trend">
            {renderTrendGraph()}
        </div>
        <div className={styles.copy}>
            <button
                title="Copy Link"
                className={styles.button}
                onClick={e => {
                    setCopied(true);
                    copy(toAbsoluteUrl(props.data))
                }}>
                {!copied ? <Unicons.UilCopy size={20} /> : <Unicons.UilCheck size={20} />}
            </button>
        </div>
    </div>
}
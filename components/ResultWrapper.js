import { useState } from 'react';

import styles from "./ResultWrapper.module.css";

import TrendRangeContext from "./utils/TrendRangeContext";

export default function ResultLoader(props) {
    let [trendRange, setTrendRange] = useState(_ => "per-minute")

    return <TrendRangeContext.Provider value={trendRange}>
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.left}>{props.title}</div>
                <div className={styles.right}>
                    <select className={styles.dropdown} value={trendRange} onChange={e => setTrendRange(e.currentTarget.value)}>
                        <option value="per-minute">Per-minute</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
            <div ref={props.fwdRef} className={styles.content}>{props.children}</div>
        </div>
    </TrendRangeContext.Provider>
}
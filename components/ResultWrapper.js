import React, { useRef, useEffect } from "react";

import styles from "./ResultWrapper.module.css";

export default function ResultLoader(props) {

    const containerRef = useRef(null)

    useEffect(() => {
        containerRef.current.scrollTo(0, 0);
    }, [props.size])

    return <div className={styles.main}>
        <div className={styles.header}>Your Links</div>
        <div ref={containerRef} className={styles.content}>{props.children}</div>
    </div>
}
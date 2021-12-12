import Head from "next/head"
import styles from "./Page.module.css"

export default function MainPage(props) {
    return (<>
        <Head>
            <title>Naman's URL Shortner</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
            <main className={styles.main} >
                {props.children}
            </main>

            <footer className={styles.footer} >
                <a
                    href="https://namansood.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made by Naman Sood
                </a>
            </footer>
        </div>
    </>)
}
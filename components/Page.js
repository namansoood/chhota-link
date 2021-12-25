import Head from "next/head"
import styles from "./Page.module.css"
import Logo from "./Logo"

export default function MainPage(props) {
    return (<>
        <Head>
            <title>Chhota Link - URL shortner.</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
            <header className={styles.header}>
                <Logo />
            </header>

            <main className={styles.main} >
                {props.children}
            </main>

            <footer className={styles.footer} >
                <a
                    href="https://namansood.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made by <span className="shimmer">Naman Sood</span>
                </a>
            </footer>
        </div>
    </>)
}
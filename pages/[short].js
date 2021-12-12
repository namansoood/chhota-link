const dev = process.env.NODE_ENV !== 'production';

const origin = dev ? 'http://localhost:3001' : 'https://your_deployment.server.com';

export async function getServerSideProps(context) {
    console.log("context", context);
    const res = await fetch(`${origin}/api/get?short=${context.query.short}`)
    const data = await res.json()
    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}

export default function () {
    return (<></>)
}
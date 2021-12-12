const dev = process.env.NODE_ENV !== 'production';

const origin = dev ? 'http://localhost:3001' : 'https://your_deployment.server.com';

export async function getServerSideProps(context) {
    console.log("context", context);
    const res = await fetch(`${origin}/api/get?short=${context.query.short}&visit=true`)
    const data = await res.json()
    if (data.destination) {
        return {
            redirect: {
                destination: data.destination,
                permanent: false,
            },
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    }
}

export default function () {
    return (<></>)
}
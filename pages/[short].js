import { getByShort } from "../utils/api";

export async function getServerSideProps(context) {
    console.log("context", context);
    const res = await getByShort(context.query.short, true)
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
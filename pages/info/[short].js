import { getByShort } from "../../utils/api";
import Page from "../../components/Page.js"
import Detailed from "../../components/Detailed.js"

export async function getServerSideProps(context) {
    const res = await getByShort(context.query.short, false, context.req.headers)
    const data = await res.json()
    if (data) {
        return {
            props: data,
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    }
}

export default function (props) {
    console.log("props", props)
    return <Page>
        <Detailed data={props} />
    </Page>
}
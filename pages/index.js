import React, { useState } from "react"

import Page from "../components/Page.js"
import Form from "../components/Form.js"
import ResultLoader from "../components/ResultLoader.js"
import ResultWrapper from "../components/ResultWrapper.js"

export default function Home() {

  let [state, setState] = useState([])

  return (<Page>
    <>
      <Form onSubmit={value => setState(state.concat([value]))} />
      {state.length > 0 ? <ResultWrapper>
        {state.map(value => <ResultLoader key={value} url={value} />)}
      </ResultWrapper> : null}
    </>
  </Page>)
}

import React, { useState } from "react"

import Page from "../components/Page.js"
import Form from "../components/Form.js"
import ResultLoader from "../components/ResultLoader.js"
import ResultWrapper from "../components/ResultWrapper.js"

export default function Home() {

  let [state, setState] = useState([])

  return (<Page>
    <>
      <Form onSubmit={value => setState([value].concat(state))} />
      {state.length > 0 ? <ResultWrapper size={state.length}>
        {state.map((value, idx) => <ResultLoader num={idx} key={idx} url={value} />)}
      </ResultWrapper> : null}
    </>
  </Page>)
}

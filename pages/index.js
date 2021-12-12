import React, { useState } from "react"

import Page from "../components/Page.js"
import Form from "../components/Form.js"
import ResultLoader from "../components/ResultLoader.js"

export default function Home() {

  let [state, setState] = useState(undefined)

  return (<Page>
    <><Form onSubmit={value => setState(value)} />
      <ResultLoader url={state} /></>
  </Page>)
}

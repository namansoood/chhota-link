import React, { useState, useRef, useEffect } from "react"

import Page from "../components/Page.js"
import Form from "../components/Form.js"
import ResultLoader from "../components/ResultLoader.js"
import ResultWrapper from "../components/ResultWrapper.js"

export default function Home() {

  let [state, setState] = useState([])

  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [state.length])

  return (<Page>
    <>
      <Form onSubmit={value => setState([value].concat(state))} />
      {state.length > 0 ? <ResultWrapper fwdRef={containerRef}>
        {state.map((value, idx) => <ResultLoader num={idx} key={idx} url={value} />)}
      </ResultWrapper> : null}
    </>
  </Page>)
}

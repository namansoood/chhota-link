import React, { useState, useRef, useEffect } from "react"

import Page from "../components/Page.js"
import Form from "../components/Form.js"
import Result from "../components/Result";
import Error from "../components/Error";
import ResultLoader from "../components/ResultLoader.js"
import ResultWrapper from "../components/ResultWrapper.js"

import { getByUrl, getList } from "../utils/api.js";
import { useStorage } from "../utils/storage.js"

export default function Home() {

  let [state, setState] = useState([])
  let [error, setError] = useState(undefined)
  let [recentPublic, setRecentPublic] = useState([])

  const containerRef = useRef(null)


  useEffect(() => {
    let [get, _] = useStorage()

    let stored = get() || []
    setState(stored.filter(value => value != ""))


    getList()
      .then(res => {
        if (res.status === 200) {
          res.json().then(json => {
            setRecentPublic(json)
          }).catch(_ => console.error("Loading recents: Something went wrong"))
        } else {
          res.json().then(json => {
            console.error("Loading recents:", json.message)
          }).catch(_ => console.error("Loading recents: Something went wrong"))
        }
      })
  }, [])

  useEffect(() => {
    let [_, set] = useStorage()
    if (containerRef.current !== null) {
      containerRef.current.scrollTo(0, 0);
    }
    set(state)
  }, [state.length])

  let onSubmit = (value, private_) => {
    setError(undefined)
    getByUrl(value, private_).then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          setState([json.destination].concat(state))
        }).catch(_ => setError("Something went wrong"))
      } else {
        res.json().then(json => {
          setError(json.message)
        }).catch(_ => setError("Something went wrong"))
      }
    })
  }

  return (<Page>
    <>
      <Form onSubmit={onSubmit} />
      <Error error={error} />
      {state.length > 0 ? <ResultWrapper title="Your Links" fwdRef={containerRef}>
        {state.map((value, idx) => <ResultLoader num={idx} key={idx} url={value} />)}
      </ResultWrapper> : null}
      {recentPublic.length > 0 ? <ResultWrapper title="Recent Links" fwdRef={containerRef}>
        {recentPublic.map((data, idx) => <Result key={idx} data={data} />)}
      </ResultWrapper> : null}
    </>
  </Page>)
}

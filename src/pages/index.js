import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Visualizer from "../components/visualizer"
import Downloader from "../components/downloader"

import "../../node_modules/jexcel/dist/jexcel.css"

const JexcelLazy = React.lazy(() => import("../components/excel"))
const defaultData = [
  ["AATTGGCCNGGAA", "15"],
  ["AATTGGCCNGGGG", "11"],
  ["AATTGGCCNGGAT", "1"],
]

const defaultColumns = [
  {
    type: "text",
    title: "Sequence",
  },
  {
    type: "text",
    title: "Reads",
  },
]

const IndexPage = () => {
  const isSSR = typeof window === "undefined"

  const [state, setState] = useState({
    onTarget: defaultData[0][0],
    headers: ["Reads"],
    data: defaultData,
  })

  const onSheetChange = sheet => {
    const d = sheet.jexcel.getData()
    var h = []
    for (let i = 1; i < d[0].length; i++) {
      h.push(sheet.jexcel.getHeader(i))
    }

    setState({
      data: d,
      onTarget: d[0][0],
      headers: h,
    })
  }

  var options = {
    data: state.data,
    minDimensions: [2, 7],
    columns: defaultColumns,
    defaultColWidth: 200,
    style: {
      A1: "background-color: orange;",
    },
    onchange: onSheetChange,
    onchangeheader: onSheetChange,
    copyCompatibility: true,
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Visualizer</h1>

      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <JexcelLazy options={options} />
        </React.Suspense>
      )}
      <br />
      <Visualizer
        onTarget={state.onTarget}
        headers={state.headers}
        data={state.data}
      />

      <Downloader />
      <p>TODO: add instructions</p>
      <p>Use better method of embed, base64 encode the object</p>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default IndexPage

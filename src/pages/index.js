import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Jexcel from "../components/excel"
import Visualizer from "../components/visualizer"

import "../../node_modules/jexcel/dist/jexcel.css"

const defaultData = [
  ["AATTGGCCNGGAA", 15],
  ["AATTGGCCNGGGG", 11],
  ["AATTGGCCNGGAT", 1],
]

const defaultColumns = [
  {
    type: "text",
    title: "Sequence",
  },
  {
    type: "numeric",
    title: "Reads",
  },
]

const IndexPage = () => {
  const [onTarget, setOnTarget] = useState(defaultData[0][0])
  const [headers, setHeaders] = useState(["Reads"])
  const [data, setData] = useState(defaultData)

  const onSheetChange = sheet => {
    const d = sheet.jexcel.getData()

    var h = []
    for (let i = 1; i < d[0].length; i++) {
      h.push(sheet.jexcel.getHeader(i))
    }
    setOnTarget(d[0][0])
    setHeaders(h)
    setData(d)
  }

  var options = {
    data: data,
    minDimensions: [2, 7],
    columns: defaultColumns,
    defaultColWidth: 200,
    style: {
      A1: "background-color: orange;",
    },
    onchange: onSheetChange,
    copyCompatibility: true,
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Visualizer</h1>
      <Jexcel options={options} />

      <div id="visualization"></div>
      <Visualizer onTarget={onTarget} headers={headers} data={data} />

      <p>Todo, start spreadsheet with a default.</p>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default IndexPage

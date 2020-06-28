import React, { useEffect } from "react"

import SEO from "../components/seo"
import { visualize } from "../components/visualizer"
import queryString from "query-string"
const EmbedPage = () => {
  useEffect(() => {
    const props = queryString.parse(window.location.search)

    var { onTarget, data, title, headers } = props

    if (!Array.isArray(headers)) {
      headers = [headers]
    }

    visualize(
      "#visualization",
      onTarget,
      headers,
      data.map(d => {
        return d.split(",")
      }),
      title
    )
  })

  return (
    <main>
      <SEO title="Mismatch Visualization" />
      <div id="visualization"></div>
    </main>
  )
}

export default EmbedPage

import React, { useEffect, useState } from "react"
import { SVG } from "@svgdotjs/svg.js"
import queryString from "query-string"

const boxSize = 15

const colors = {
  G: "#F5F500",
  A: "#FF5454",
  T: "#00D118",
  C: "#26A8FF",
  N: "#B3B3B3",
}

const copyToClipboard = str => {
  const el = document.createElement("textarea")
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}

const Visualizer = props => {
  const [title, setTitle] = useState("Title")
  const { onTarget, headers, data } = props
  useEffect(() => {
    document.getElementById("visualization").innerHTML = ""

    visualize("#visualization", onTarget, headers, data, title)
  })

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={e => {
          setTitle(e.target.value)
        }}
      />

      <div id="visualization"></div>

      <button
        onClick={() => {
          const url =
            window.location.origin +
            "/embed?" +
            queryString.stringify({ onTarget, headers, data, title })

          let embed = document.createElement("iframe")
          embed.setAttribute("src", url)

          copyToClipboard(embed.outerHTML)
        }}
      >
        Copy Embed Code
      </button>
    </>
  )
}

function range(start, end) {
  var ans = []
  for (let i = start; i < end; i++) {
    ans.push(i)
  }
  return ans
}

export function visualize(domTarget, onTarget, headers, data, title) {
  let xOffset = 20
  let yOffset = 50

  var draw = SVG()
    .addTo(domTarget)
    .size("100%", "100%")
  // .viewbox(0, 0, 10, 100)

  draw.rect("100%", "100%").attr("fill", "white")

  // Title
  draw
    .text(title)
    .x(xOffset)
    .y(30)
    .css("font-size", "20px")
    .css("font-family", "Courier")

  // Ticks
  var tickLocations = [1, onTarget.length]
  tickLocations = tickLocations.concat(
    range(0, onTarget.length + 1)
      .filter((val, idx) => {
        return idx % 10 === 0
      })
      .slice(1)
  )
  tickLocations.forEach((tick, idx, _) => {
    draw
      .text(tick.toString())
      .x(xOffset + (tick - 1) * boxSize + 2)
      .y(yOffset - 2)
      .css("font-size", "10px")
      .css("font-family", "Courier")
  })

  // On Target
  onTarget.split("").forEach((c, idx) => {
    let y = yOffset
    let x = xOffset + idx * boxSize

    draw
      .rect(boxSize, boxSize)
      .x(x)
      .y(y)
      .attr("fill", colors[c.toUpperCase()])

    draw
      .text(c)
      .x(x + 3)
      .y(y + boxSize - 20)
      .attr("fill", "black")
      .css("font-size", "15px")
      .css("font-family", "Courier")
  })

  // Header names
  var extraXOffset = boxSize * onTarget.length + 16
  for (var i = 0; i < headers.length; i++) {
    draw
      .text(headers[i])
      .x(xOffset + extraXOffset)
      .y(yOffset + boxSize - 20)
      .css("font-size", "15px")
      .css("font-family", "Courier")

    var idx = 0

    let headerData = []
    for (const row of data) {
      headerData.push(row[i + 1]) // +1 because the first column is sequence
    }

    for (const row of headerData) {
      draw
        .text(row)
        .x(xOffset + extraXOffset)
        .y(yOffset + 10 + boxSize * (idx + 2) - 19)
        .attr("fill", "black")
        .css("font-size", "15px")
        .css("font-family", "Courier")

      idx++
    }

    // The next column should be extraXOffset units to the right
    // extraXOffset is calculated by the largest value of data in the headers or the header itself
    let longestDatapoint = Math.max(
      ...[headers[i].length, ...headerData.map(el => el.length)]
    )
    extraXOffset += longestDatapoint * 10 + 30
  }

  // Draw aligned off targets
  yOffset += 10 // leave some extra space after the reference row

  data
    .map(x => x[0])
    .forEach((seq, j) => {
      let y = yOffset + j * boxSize

      seq.split("").forEach((c, i) => {
        let x = xOffset + i * boxSize

        if (c === onTarget.charAt(i) || onTarget.charAt(i) === "N") {
          draw
            .text("\u2022")
            .x(x + 4.5)
            .y(2 * boxSize + y - 21)
            .attr("fill", "black")
            .css("font-size", "10px")
            .css("font-family", "Courier")
        } else {
          draw
            .rect(boxSize, boxSize)
            .x(x)
            .y(boxSize + y)
            .attr("fill", colors[c.toUpperCase()])

          draw
            .text(c)
            .x(x + 3)
            .y(2 * boxSize + y - 20)
            .attr("fill", "black")
            .css("font-size", "15px")
            .css("font-family", "Courier")
        }
      })
    })
}

export default Visualizer

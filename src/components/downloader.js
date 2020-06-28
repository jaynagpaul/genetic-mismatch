import React from "react"
import Canvg, { presets } from "canvg"
function downloadURI(uri, name) {
  // Construct the <a> element
  var link = document.createElement("a")
  link.download = name
  // Construct the uri
  link.href = uri
  document.body.appendChild(link)
  link.click()
  // Cleanup the DOM
  document.body.removeChild(link)
}

const Downloader = () => {
  const downloadVisualization = async () => {
    const canvas = new OffscreenCanvas(920, 1000)
    const ctx = canvas.getContext("2d")

    //SET WHITE BACKGROUND
    // change non-opaque pixels to white
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var data = imgData.data
    for (var i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 255) {
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
        data[i + 3] = 255
      }
    }
    ctx.putImageData(imgData, 0, 0)

    const v = await Canvg.from(
      ctx,
      document.getElementById("visualization").innerHTML,
      presets.offscreen()
    )

    // Render only first frame, ignoring animations and mouse.
    await v.render()

    const blob = await canvas.convertToBlob({
      type: "image/jpeg",
    })
    const jpgUrl = URL.createObjectURL(blob)

    downloadURI(jpgUrl, "visualization.jpg")
  }

  return (
    <>
      <button onClick={downloadVisualization}>Download</button>
      <canvas id="downloadCanvas"></canvas>
    </>
  )
}

export default Downloader

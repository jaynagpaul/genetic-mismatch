import jexcel from "jexcel"
import React from "react"
import ReactDOM from "react-dom"

//TODO: refactor to hooks
class Jexcel extends React.Component {
  constructor(props) {
    super(props)
    this.options = props.options
    this.state = { rowsToAdd: 1 }
  }

  componentDidMount = function() {
    this.el = jexcel(ReactDOM.findDOMNode(this).children[0], this.options)
  }

  addRow = function() {
    for (var i = 0; i < this.state.rowsToAdd; i++) {
      this.el.insertRow()
    }
  }

  handleRowsToAddChange = event => {
    this.setState({ rowsToAdd: event.target.value })
  }
  render() {
    return (
      <div>
        <div></div>
        <br />
        <br />
        <input
          type="text"
          value={this.state.rowsToAdd}
          onChange={this.handleRowsToAddChange}
        />
        <input
          type="button"
          value={`Add ${this.state.rowsToAdd} new row${
            this.state.rowsToAdd > 1 ? "s" : ""
          }`}
          onClick={() => this.addRow()}
        ></input>
      </div>
    )
  }
}

export default Jexcel

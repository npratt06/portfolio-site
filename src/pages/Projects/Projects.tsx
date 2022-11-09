import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Projects extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to='/'>Home</Link>
        </div>
        <div>
          Projects
        </div>
      </div>
    )
  }
}
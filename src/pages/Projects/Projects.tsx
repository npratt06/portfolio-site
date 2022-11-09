import Box from '@mui/material/Box'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { homeStyle } from '../Home/Home.const'

export default class Projects extends Component {
  render() {
    return (
      <div>
        <Box sx={homeStyle}>
            <Link to='/'>Home</Link>
            <div>Projects</div>
        </Box>
      </div>
    )
  }
}
import Box from '@mui/material/Box'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { homeStyle } from '../Home/Home.const'

export default class About extends Component {
  render() {
    return (
      <div>
        <Box sx={homeStyle}>
            <Link to='/'>Home</Link>
            <div>About</div>
        </Box>
      </div>
    )
  }
}
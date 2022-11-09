import React, { Component } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Box from '@mui/material/Box';
import { homeStyle } from './Home.const';

export default class Home extends Component {
  render() {
    return (
      <Box sx={homeStyle}>
        <Navigation />
      </Box>
    )
  }
}
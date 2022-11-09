import Box from '@mui/material/Box'
import React, { Component } from 'react'
import NavDisplay from './NavDisplay/NavDisplay'
import { outerWrapper, rowElement, NavigationProps } from './Navigation.interface'
import NavigateLR from './NavLR/NavLR'
import { MyPages } from './NavDisplay/NavDisplay.interface';

export default class Navigation extends Component<any, NavigationProps>{

  constructor(props: any) {
    super(props);

    this.state = {
      navIndex: 0
    }
  }

  handleClickLeft() {
    this.setState((prevState) => {
      let cni = prevState.navIndex - 1;
      if (cni < 0) cni = MyPages.pages.length - 1;
      return { navIndex: cni }
    });
  }

  handleClickRight() {
    this.setState((prevState) => {
      let cni = prevState.navIndex + 1;
      if (cni > MyPages.pages.length - 1) cni = 0;
      return { navIndex: cni }
    });
  }

  render() {
    return (
      <div>
        <Box sx={outerWrapper}>
          <Box sx={rowElement}>
            <NavDisplay navIndex={this.state.navIndex}></NavDisplay>
          </Box>
          <Box sx={rowElement}>
            <NavigateLR navIndex={this.state.navIndex} handleClickLeft={this.handleClickLeft.bind(this)} handleClickRight={this.handleClickRight.bind(this)}></NavigateLR>
          </Box>
        </Box>
      </div>
    )
  }
}

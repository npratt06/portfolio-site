import { Component, MouseEventHandler } from 'react';
import { NavigateLRProps, NavigateLRState } from './NavLR.interface';
import leftBtn from '../../../img/navLeftBtn_grey.png';
import rightBtn from '../../../img/navRightBtn_grey.png';
import selectBtn from '../../../img/selectBtn_grey.png';
import NavBtn from './NavBtn/NavBtn';

export default class NavigateLR extends Component<NavigateLRProps, NavigateLRState> {
  handleClickLeft: MouseEventHandler<HTMLDivElement>;
  handleClickRight: MouseEventHandler<HTMLDivElement>;
  handleMouseDown: (() => void) | undefined;
  handleMouseUp: (() => void) | undefined;
  handleMouseLeave: (() => void) | undefined;

  constructor(props: NavigateLRProps) {
    super(props);
    this.handleClickLeft = props.handleClickLeft;
    this.handleClickRight = props.handleClickRight;
    this.handleMouseDown = props.handleMouseDown;
    this.handleMouseUp = props.handleMouseUp;
    this.handleMouseLeave = props.handleMouseLeave;
    this.state = {
      deviceType: props.deviceType
    };
  }

  componentDidUpdate(prevProps: Readonly<NavigateLRProps>): void {
    if (prevProps.deviceType !== this.props.deviceType) {
      this.setState(() => {
        return { deviceType: this.props.deviceType };
      });
    }
  }

  getComponents(): JSX.Element {
    const selectButton = <NavBtn imgSrc={selectBtn} btnText={'SELECT'} deviceType={this.state.deviceType} disabled />;

    return (
      <div style={{ display: 'flex' }}>
        <NavBtn
          imgSrc={leftBtn}
          btnText={''}
          handleClick={this.handleClickLeft}
          handleMouseDown={this.handleMouseDown}
          handleMouseUp={this.handleMouseUp}
          handleMouseLeave={this.handleMouseLeave}
          deviceType={this.state.deviceType}
        />
        <div aria-label="Old jukebox navigation is disabled" title="Old navigation is disabled for the archive">
          {selectButton}
        </div>
        <NavBtn
          imgSrc={rightBtn}
          btnText={''}
          handleClick={this.handleClickRight}
          handleMouseDown={this.handleMouseDown}
          handleMouseUp={this.handleMouseUp}
          handleMouseLeave={this.handleMouseLeave}
          deviceType={this.state.deviceType}
        />
      </div>
    );
  }

  render() {
    const components: JSX.Element = this.getComponents();
    return <div>{components}</div>;
  }
}

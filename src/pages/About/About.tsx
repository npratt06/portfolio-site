import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getStyleSet, StyleSet } from '../../components/componentHelpers';
import { outerWrapper } from '../../components/JukeBox/JukeBox.interface';
import { aboutContentOne, aboutContentThree, aboutContentTwo, aboutImgStyle, aboutRowStyle, aboutStyle, ABOUT_STYLE_SETS } from './About.const';
import { AboutProps, AboutState } from './About.interface';
import nateHeadshot from '../../img/nate-headshot-rounded.png';
import lilAndScoob from '../../img/lil-scoob-rounded.png';
import animals from '../../img/animals-rounded.png';
import ScrollAnimation from 'react-animate-on-scroll';

export default class About extends Component<AboutProps, AboutState> {

    styleSet: StyleSet;
    
    constructor(props: AboutProps) {
        super(props);
        this.state = {
            deviceType: props.deviceType
        };

        this.styleSet = getStyleSet(props.deviceType, ABOUT_STYLE_SETS);
    }

    componentDidUpdate(prevProps: Readonly<AboutProps>): void {
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
            this.styleSet = getStyleSet(this.props.deviceType, ABOUT_STYLE_SETS);
        }
    }

    render() {
        return (
            <div style={aboutStyle}>
                <div style={outerWrapper}>
                    <div style={aboutRowStyle}>
                        <div style={{ display: 'flex', justifyContent: 'left', width: '100vw'}}>
                            <Link to="/" style={{ fontSize: '25px' }}>Home Page</Link>
                        </div>
                    </div>
                    <div style={{ marginTop: '50px' }} />
                    <div style={aboutRowStyle}>
                        <div style={this.styleSet.aboutTitleStyle}>
                            <div style={{ fontSize: '225%' }}>About Me</div>
                        </div>
                    </div>
                    <div style={aboutRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <ScrollAnimation initiallyVisible={true} animateIn="jackInTheBox">
                        <div style={aboutRowStyle}>
                            <div style={{...this.styleSet.aboutRowContentStyle, ...this.styleSet.aboutTxtWrapperStyle}}>
                                {aboutContentOne}
                            </div>
                            <div style={this.styleSet.aboutImgWrapperStyle}>
                                <img style={aboutImgStyle} src={nateHeadshot}></img>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <div style={aboutRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <ScrollAnimation offset={50} initiallyVisible={true} animateIn="headShake">
                        <div style={aboutRowStyle}>
                            <div style={this.styleSet.aboutImgWrapperStyle}>
                                <img style={aboutImgStyle} src={lilAndScoob}></img>
                            </div>
                            <div style={{...this.styleSet.aboutRowContentStyle, ...this.styleSet.aboutTxtWrapperStyle}}>
                                {aboutContentTwo}
                            </div>
                        </div>
                    </ScrollAnimation>
                    <div style={aboutRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <ScrollAnimation initiallyVisible={true} animateIn="headShake">
                        <div style={aboutRowStyle}>
                            <div style={{...this.styleSet.aboutRowContentStyle, ...this.styleSet.aboutTxtWrapperStyle}}>
                                {aboutContentThree}
                            </div>
                            <div style={this.styleSet.aboutImgWrapperStyle}>
                                <img style={aboutImgStyle} src={animals}></img>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <div style={{ marginBottom: '3vw' }} />
                </div>
            </div>
        );
    }
}

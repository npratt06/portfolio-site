import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getStyleSet, StyleSet } from '../../components/componentHelpers';
import { outerWrapper } from '../../components/JukeBox/JukeBox.interface';
import { aboutContentOne, aboutContentTwo, aboutContentThree, aboutContentFour, aboutImgStyle, aboutRowStyle, aboutStyle, ABOUT_STYLE_SETS } from './About.const';
import { AboutProps, AboutState } from './About.interface';
import nateHeadshot from '../../img/nate-headshot-rounded.png';
import lilAndScoob from '../../img/lil-scoob-rounded.png';
import animals from '../../img/animals-rounded.png';
import lilScoobMe from '../../img/lil-scoob-me-rounded.png';

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

    getComponents(): JSX.Element {
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
                    <div style={aboutRowStyle}>
                        <div style={{...this.styleSet.aboutRowContentStyle, ...this.styleSet.aboutTxtWrapperStyle}}>
                            {aboutContentOne}
                        </div>
                        <div style={this.styleSet.aboutImgWrapperStyle}>
                            <img style={aboutImgStyle} src={nateHeadshot}></img>
                        </div>
                    </div>
                    <div style={aboutRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <div style={aboutRowStyle}>
                        <div style={this.styleSet.aboutImgWrapperStyle}>
                            <img style={aboutImgStyle} src={lilAndScoob}></img>
                        </div>
                        <div style={{...this.styleSet.aboutRowContentStyle, ...this.styleSet.aboutTxtWrapperStyle}}>
                            {aboutContentTwo}
                        </div>
                    </div>
                    <div style={aboutRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <div style={aboutRowStyle}>
                        <div style={{...this.styleSet.aboutRowContentStyle, ...this.styleSet.aboutTxtWrapperStyle}}>
                            {aboutContentThree}
                        </div>
                        <div style={this.styleSet.aboutImgWrapperStyle}>
                            <img style={aboutImgStyle} src={animals}></img>
                        </div>
                    </div>
                    <div style={aboutRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <div style={aboutRowStyle}>
                        <div style={this.styleSet.aboutImgWrapperStyle}>
                            <img style={aboutImgStyle} src={lilScoobMe}></img>
                        </div>
                        <div style={{...this.styleSet.aboutRowContentStyle, ...this.styleSet.aboutTxtWrapperStyle}}>
                            {aboutContentFour}
                        </div>
                    </div>
                    <div style={{ marginBottom: '3vw' }} />
                </div>
            </div>
        );
    }

    render() {
        const components: JSX.Element = this.getComponents();
        return (<div>{components}</div>);
    }
}

import React, { Component } from 'react';
import JukeBox from '../../components/JukeBox/JukeBox';
import Test from '../../components/Zomboozled/Test';
import { homeStyle } from './Home.const';
import { HomeProps, HomeState } from './Home.interface';

export default class Home extends Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            deviceType: props.deviceType
        }
    }

    componentDidUpdate(prevProps: Readonly<HomeProps>): void {
        if (this.props.deviceType !== prevProps.deviceType) {
            const deviceType = this.props.deviceType;
            this.setState({ deviceType });
        }
    }

    getComponents(): JSX.Element {
        return (
            <div style={homeStyle}>
                <JukeBox deviceType={this.state.deviceType}/>
            </div>
        );
    }

    render() {
        // const components: JSX.Element = this.getComponents();
        // return (<div>{components}</div>);
        return <Test />;
    }
}

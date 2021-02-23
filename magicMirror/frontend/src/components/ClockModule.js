import React, { Component } from "react";

import Fade from 'react-reveal/Fade';

class Time extends React.Component{
    constructor() {
        super();
        this.state = {
            visible: true,
            time: moment().format('HH:mm'),
            seconds: moment().format('ss'),
            date: moment().format('ddd, DD MMM YYYY'),
        };
    }

    componentDidMount() {
        setInterval(()=>{
            var time = moment();
            this.setState({
                time: time.format('HH:mm'),
                seconds: time.format('ss'),
                date: time.format('ddd, DD MMM YYYY'),
            })
        },1000)
    }

    render() {
        return (
            <div id="clock" className={this.state.visible?'fadeIn':'fadeOut'}>
                <div>
                    <div className="time">{this.state.time}</div>
                    <div className="seconds">{this.state.seconds}</div>
                </div>
                <div className="date">{this.state.date}</div>
            </div>
        );
    }
}

export default Time;
import React, { Component } from "react";

import Fade from 'react-reveal/Fade';

class Time extends React.Component{
    constructor() {
        super();
        this.state = {
            time: moment().format('HH:mm'),
            addons: moment().format('ss'),
            date: moment().format('ddd, DD MMM YYYY'),
        };
    }

    componentDidMount() {
        setInterval(()=>{
            var time = moment();
            this.setState({
                time: time.format('HH:mm'),
                addons: time.format('ss'),
                date: time.format('ddd, DD MMM YYYY'),
            })
        },1000)
    }

    render() {
        const clockStyle = {
            textAlign: "center",
            color: '#fff',
            marginTop: "20px",
        }

        const timeStyle = {
            fontSize: "6em",
            display: "inline-block",
            fontFamily: "'Roboto', sans-serif",
            lineHeight: "1em",
            height: "1em",
        }

        const addonStyle = {
            fontSize: "2em",
            display: "inline-block",
            fontFamily: "'Roboto', sans-serif",
            lineHeight: "1em",
            height: "1em",
            verticalAlign: "sub",
        }

        const dateStyle = {
            fontSize: "1.8em",
            fontFamily: "'Roboto', sans-serif",
            lineHeight: "0.9em",
            height: "0.9em",
        }

        return (
            <Fade collapse bottom>
                <div id="datetime" style={clockStyle}>
                    <div className="time">
                        <div style={timeStyle}>{this.state.time}</div>
                        <div style={addonStyle}>{this.state.addons}</div>
                    </div>
                    <div style={dateStyle}>{this.state.date}</div>
                </div>
            </Fade>
        );
    }
}

export default Time;
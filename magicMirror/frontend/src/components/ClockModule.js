import React, { Component } from "react";

class Time extends React.Component{
    constructor() {
        super();
        this.state = {
            time: moment().format('LTS'),
            date: moment().format('DD/MM/YYYY'),
        };
    }

    componentDidMount() {
        setInterval(()=>{
            this.setState({
                time: moment().format('LTS'),
                date: moment().format('DD/MM/YYYY'),
            })
        },1000)
    }

    render() {
        const clockstyle = {
            textAlign: 'center',
            color: '#fff',
            padding: "10px",
        }

        return (
            <div id="datetime" style={clockstyle}>
                <h1 id="time">{this.state.time}</h1>
                <h2 id="date">{this.state.date}</h2>
            </div>
        );
    }
}

export default Time;
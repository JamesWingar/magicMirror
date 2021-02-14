import React from "react";

import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import API from "../utility/API";

import Container from "react-bootstrap/Container";


class Calendar extends React.Component{
    constructor() {
        super();
        this.groupProps = {
            appear: true,
            enter: true,
            exit: true,
        };
        this.state = {
            visible: true,
            start_date: moment().subtract(moment().format('E') - 1, 'days').format('Y-MM-DD'),
            delta_days: moment().format('E'),
            dates: [],
            events: {},
        };
        this.getEvents();
    }

    componentDidMount() {
        setInterval(()=>{
            this.getEvents();
        },10000)
    }

    updateDates() {
        const dates = this.state.dates;
        const events = this.state.events;
        var delta_days = moment().format('E');
        var start_date = moment().subtract(delta_days - 1, 'days');
        // add new dates
        const new_date = moment(start_date);
        for (var i = 0; i < 14; i++) {
            const new_date_str = new_date.format('Y-MM-DD');
            if (!dates.includes(new_date_str)){
                dates.push(new_date_str);
            }
            if (!events.hasOwnProperty(new_date_str)) {
                events.[new_date_str] = [];
            }
            new_date.add(1, 'day');
        }
        // remove old days
        if (Object.keys(events).length > 14) {
            delete events.[dates.shift()];
        }

        this.setState({
            dates: dates,
            events: events,
            start_date: start_date.format('Y-MM-DD'),
            delta_days: delta_days,
        });
    }

    async getEvents() {
        await this.updateDates();
        const response = await API.getEventsFromDate(this.state.start_date)

        // build reponse into event format
        var response_data = this.state.dates.reduce((acc,curr)=> (acc[curr]=[],acc),{});
        for (const key in response.data) {
            var event = response.data[key];
            if (response_data.hasOwnProperty(event.start_date.date)) {
                response_data.[event.start_date.date].push({
                    id: event.id,
                    start_date: event.start_date.date,
                    start_time: event.start_time,
                    length: event.length,
                    end_date: event.end_date,
                    title: event.title
                })
            }
        }

        // find changes in reponse and replace with events
        for (const key in this.state.events) {
            if (this.state.events.[key] != response_data.[key]) {
                // this.changeEvent({key: key, response: response_data.[key]});
                var events = this.state.events;
                events.[key] = response_data.[key];
                this.setState({events: events});
            }
        }
    }

    renderDateSquare(date) {
        if (date == null) { return <div className="square" style={squareStyle}></div>} 
        if (date == moment().format('Y-MM-DD')) {
            var squareStyle = { border: '3px solid #fff' };
        }

        var dateStyle = {
            fontSize: 20,
            textAlign: 'right',
            paddingRight: 10,
        };

        var eventStyle = {
            width: '90%',
            margin: '0 auto',
        };

        return (

            <div className="square" style={squareStyle}>
                <div style={dateStyle}>{moment(date).format('DD')}</div>
                <TransitionGroup {...this.groupProps}>
                {
                    this.state.events.[date].map(event => (
                        <Fade key={event.id} collapse bottom>
                            <div className="card" style={eventStyle}> 
                                {event.start_time} - {event.title}
                            </div>
                        </Fade>
                    ))
                }
                </TransitionGroup>
            </div>
        );
    }

    renderCalendar() {
        return (
            <Container id="calendarObject" fluid>
                <div className="calendar-row">
                    {this.renderDateSquare(this.state.dates[0])}
                    {this.renderDateSquare(this.state.dates[7])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(this.state.dates[1])}
                    {this.renderDateSquare(this.state.dates[8])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(this.state.dates[2])}
                    {this.renderDateSquare(this.state.dates[9])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(this.state.dates[3])}
                    {this.renderDateSquare(this.state.dates[10])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(this.state.dates[4])}
                    {this.renderDateSquare(this.state.dates[11])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(this.state.dates[5])}
                    {this.renderDateSquare(this.state.dates[12])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(this.state.dates[6])}
                    {this.renderDateSquare(this.state.dates[13])}
                </div>
            </Container>
        )
    }

    render() {
        const calendarStyle = {
            textAlign: 'left',
            color: '#fff',
            padding: "10px",
        }

        return (
            <div id="calendar" className={this.state.visible?'fadeIn':'fadeOut'} style={calendarStyle}>
                <div className="title">Calendar</div>
                    {this.renderCalendar()}
            </div>
        );
    }
}

export default Calendar;
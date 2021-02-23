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
            dates: [],
            events: [],
        };
    }

    componentDidMount() {
        this.updateEvents();
        setInterval(()=>{
            this.updateEvents();
        },10000)
    }

    async updateEvents() {
        // API call to get dates
        const response_dates = await API.getDates()
        let dates = response_dates.data.map(element => element.date)            

        // API call to get events
        const response_events = await API.getEventsFromDate(dates.[0])
        let events = (() => {
            var response_data = dates.reduce((acc,curr)=> (acc[curr]=[],acc),{})
            response_events.data.map(event =>
                response_data.[event.start_date.date].push({
                    id: event.id,
                    start_date: event.start_date.date,
                    start_time: event.start_time,
                    length: event.length,
                    end_date: event.end_date,
                    title: event.title
                })
            );
            return response_data
        })();

        this.setState({
            events: events,
            dates: dates,
        });
    }

    renderDateSquare(index) {
        if (this.state.dates.[index] == undefined) {
            return <div className="square" style={squareStyle}></div>
        }

        const date = this.state.dates.[index]
        if (date == moment().format('Y-MM-DD')) {
            var squareStyle = { border: '3px solid #fff' };
        }

        return (
            <div className="square" style={squareStyle}>
                <div className="date">{moment(date).format('DD')}</div> 
                <TransitionGroup {...this.groupProps}>
                { //('ddd - DD')
                    this.state.events.[date].map(event => (
                        <Fade key={event.id} collapse bottom>
                            <div className="card event"> 
                                {event.start_time} - {event.title}
                            </div>
                        </Fade>
                    ))
                }
                </TransitionGroup>
            </div>
        );
    }

    render() {
        const DATE_LENGTH = 14
        
        let content = []
        for (var i = 0; i < Math.floor(DATE_LENGTH / 2); i++) {
            content.push(<div className="calendar-row">
                            {this.renderDateSquare(i)}
                            {this.renderDateSquare(i + 7)}
                        </div>)
        }

        return (
            <div id="calendar" className={this.state.visible?'fadeIn':'fadeOut'}>
                <div className="title">Calendar</div>
                <Container id="calendarObject" fluid>
                    {content}
                </Container>
            </div>
        );
    }
}

export default Calendar;
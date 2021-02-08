import React from "react";

import API from "../utility/API";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Calendar extends React.Component{
    constructor() {
        super();
        this.state = {
            visible: true,
            calendar_start_date: '',
            dates: [],
            events: {},
        };
        this.changeEvent = this.changeEvent.bind(this);
    }

    getDates() {
        var events = this.state.events
        var delta_days = moment().format('E');

        var prev_date = moment().subtract(delta_days, 'days').format('Y-MM-DD');
        if (events.hasOwnProperty(prev_date)) {
            delete events.prev_date;
        }

        var iter_date = moment().subtract(delta_days, 'days');
        for(var i = 0; i < 14; i++) {
            var new_date = iter_date.add(1, 'day').format('Y-MM-DD');
            if (!events.hasOwnProperty(new_date)) {
                events.[new_date] = {};
            }
        }

        if (Object.keys(events).length !== 14) {
            console.log("There are not 14 dates in Calendar");
            return "Error";
        }

        this.setState({
            dates: Object.keys(events),
            events: events,
            calendar_start_date: moment().subtract(delta_days - 1, 'days').format('Y-MM-DD'),
        });
    }

    async getEvents() {
        await API.getEventsFromDate(this.state.calendar_start_date).then((response) => {

            // build reponse into event format
            var response_data = this.state.dates.reduce((acc,curr)=> (acc[curr]={},acc),{});
            for (const key in response.data) {
                var data = response.data[key];
                if (response_data.hasOwnProperty(data.start_date.date)) {
                    response_data.[data.start_date.date].[data.id] = {
                        start_date: data.start_date.date,
                        start_time: data.start_time,
                        length: data.length,
                        end_date: data.end_date,
                        title: data.title
                    }
                }
            }
            // dates -> event_id -> (due,end,local,title,time,length)

            for (const key in this.state.events) {
                if (Object.keys(this.state.events.[key]) != Object.keys(response_data.[key])) {
                    this.changeEvent({key: key, response: response_data.[key]});
                }
            }
        })
    }

    changeEvent(props) {
        var events = this.state.events;
        events.[props.key] = props.response;
        this.setState({events: events});
    }

    renderDateSquare(date) {
        const vals = this.state.events.[date];

        var squareStyle = {
            border: '1px solid #666',
        };

        if (date == moment().format('Y-MM-DD')) {
            squareStyle.border = '3px solid #666';
        }

        var dateStyle = {
            fontSize: 20,
            textAlign: 'right',
            paddingRight: 10,
        };

        var eventStyle = {

        };

        return (

            <div className="square" style={squareStyle}>
                <div style={dateStyle}>{moment(date).format('DD')}</div>
                {
                // EDIT DATA INSIDE TO FADE IN AND OUT WITH NEW EVENTS
                    Object.keys(vals).map((id, index) => (
                        // TODO EDIT TO MAKE CLEAN LOOKING
                        <div style={eventStyle}> 
                            {vals[id].start_date},
                            {vals[id].start_time},
                            {vals[id].length},
                            {vals[id].end_date},
                            {vals[id].title} </div>
                    ))
                }
            </div>
        );
    }

    createCalendar() {
        if (this.state.dates.length != 14) {
            return <div> No Events </div>
        }
        const dates = this.state.dates;

        return (
            <Container id="calendarObject" fluid>
                <div className="calendar-row">
                    {this.renderDateSquare(dates[0])}
                    {this.renderDateSquare(dates[7])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(dates[1])}
                    {this.renderDateSquare(dates[8])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(dates[2])}
                    {this.renderDateSquare(dates[9])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(dates[3])}
                    {this.renderDateSquare(dates[10])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(dates[4])}
                    {this.renderDateSquare(dates[11])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(dates[5])}
                    {this.renderDateSquare(dates[12])}
                </div>
                <div className="calendar-row">
                    {this.renderDateSquare(dates[6])}
                    {this.renderDateSquare(dates[13])}
                </div>
            </Container>
        )
    }



    componentDidMount() {
        setInterval(()=>{
            this.getDates();
            this.getEvents();
        },10000)
        // CALENDAR API CALL
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
                    {this.createCalendar()}
            </div>
        );
    }
}

export default Calendar;
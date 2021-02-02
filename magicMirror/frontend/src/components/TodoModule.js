import React from "react";

import ListGroup from "react-bootstrap/ListGroup";

import API from "./API";


class Todo extends React.Component{
    constructor() {
        super();
        this.state = {
            visible: true,
            jobsToday: [],
            jobsTomorrow: [],
        };
        API.getJobsOnDate(moment().format('D-M-Y'))
            .then((response) => {
                this.setState({ jobsToday: response.data })
            })
        API.getJobsOnDate(moment().add(1, 'days').format('D-M-Y'))
            .then((response) => {
                this.setState({ jobsTomorrow: response.data })
            })
    }

    componentDidMount() {
        setInterval(()=>{
            API.getJobsOnDate(moment().format('D-M-Y'))
                .then((response) => {
                    this.setState({ jobsToday: response.data })
                })
            API.getJobsOnDate(moment().add(1, 'days').format('D-M-Y'))
                .then((response) => {
                    this.setState({ jobsTomorrow: response.data })
                })
        },10000)
    }

    getJobs(results) {
        if (results == "Error") {
            return <div> {results} </div>
        }
        if (results.length === 0) {
            return <div> No Jobs </div>
        }
        return (
            <ListGroup>
            {
                results.map(job => (
                    <ListGroup.Item className='fadeIn'>
                        <div>Job: {job.title}</div>
                        <div>Who: {job.asignee}</div>
                    </ListGroup.Item>
                ))
            }
            </ListGroup>
        );
    }

    render() {
        const jobStyle = {
            textAlign: 'left',
            color: '#fff',
            padding: "10px",
        }

        return (
            <div id="todo" className={this.state.visible?'fadeIn':'fadeOut'} style={jobStyle}>
                <h1 id="today">Today</h1>
                    {this.getJobs(this.state.jobsToday)}
                <h2 id="tomorrow">Tomorrow</h2>
                    {this.getJobs(this.state.jobsTomorrow)}
            </div>
        );
    }
}

export default Todo;
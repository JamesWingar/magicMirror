import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Fade from 'react-reveal/Fade';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import API from "../utility/API";


class Todo extends React.Component{
    constructor() {
        super();
        this.groupProps = {
            appear: true,
            enter: true,
            exit: true,
        };
        this.state = {
            visible: true,
            jobsToday: [],
            jobsTomorrow: [],
        };
        this.getJobs();
    }

    componentDidMount() {
        setInterval(()=>{
            this.getJobs()
        },10000)
    }

    async getJobs() {

        const jobsToday = await API.getJobsOnDate(moment().format('Y-MM-DD'));
        const jobsTomorrow = await API.getJobsOnDate(moment().add(1, 'days').format('Y-MM-D'));

        this.setState({
            jobsToday: jobsToday.data,
            jobsTomorrow: jobsTomorrow.data
        })
        /*
        API.getJobsOnDate(moment().format('Y-MM-DD'))
            .then((response) => {
                this.setState({ jobsToday: response.data })
            })
        API.getJobsOnDate(moment().add(1, 'days').format('Y-MM-D'))
            .then((response) => {
                this.setState({ jobsTomorrow: response.data })
             })
        */
    }

    renderJobs(jobs) {

        if (jobs.length === 0) {
            return (
                <ListGroup>
                    <Fade collapse bottom>
                        <ListGroup.Item>
                            <div> No Jobs </div>
                        </ListGroup.Item>
                    </Fade>
                </ListGroup>
            )
        }

        return (
            <ListGroup>
                <TransitionGroup {...this.groupProps}>
                {
                    jobs.map(job => (
                        <Fade key={job.id} collapse bottom>
                            <ListGroup.Item>
                                <div>Job: {job.title} ({job.asignee})</div>
                            </ListGroup.Item>
                        </Fade>
                    ))
                }
                </TransitionGroup>
            </ListGroup>
        );
    }

    render() {
        const jobStyle = {
            marginTop: "20px",
            textAlign: 'left',
            padding: "10px",
        }

        const todayStyle = {
            fontSize: 20,
        }

        const tomorrowStyle = {
            fontSize: 15,
        }

        return (
            <div id="todo" className={this.state.visible?'fadeIn':'fadeOut'} style={jobStyle}>
                <div className="title">Today</div>
                    <div style={todayStyle}>
                        {this.renderJobs(this.state.jobsToday)}
                    </div>
                <div className="subtitle">Tomorrow</div>
                    <div style={tomorrowStyle}>
                        {this.renderJobs(this.state.jobsTomorrow)}
                    </div>
            </div>
        );
    }
}

export default Todo;
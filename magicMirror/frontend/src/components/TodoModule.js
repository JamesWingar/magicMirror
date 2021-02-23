import React from "react";

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
    }

    componentDidMount() {
        this.getJobs();
        setInterval(()=>{
            this.getJobs()
        },10000)
    }

    async getJobs() {
        // API calls to 
        const jobsToday = await API.getJobsOnDate(moment().format('Y-MM-DD'));
        const jobsTomorrow = await API.getJobsOnDate(moment().add(1, 'days').format('Y-MM-D'));

        this.setState({
            jobsToday: jobsToday.data,
            jobsTomorrow: jobsTomorrow.data
        });
    }

    renderJobs(jobs) {
        if (jobs.length === 0) {
            return (
                <Fade collapse bottom>
                    <div className="card">
                        <div className="card-body"> No Jobs </div>  
                    </div>
                </Fade>
            );
        }

        return (
            <TransitionGroup {...this.groupProps}>
            {
                jobs.map(job => (
                    <Fade key={job.id} collapse bottom>
                        <div className="card">
                            <div className="card-body">{job.title} ({job.assignee})</div>
                        </div>
                    </Fade>
                ))
            }
            </TransitionGroup>
        );
    }

    render() {
        return (
            <div id="todo" className={this.state.visible?"fadeIn":"fadeOut"}>
                <div className="title">Today</div>
                    <div className="jobToday">
                        {this.renderJobs(this.state.jobsToday)}
                    </div>
                <div className="subtitle">Tomorrow</div>
                    <div className="jobTomorrow">
                        {this.renderJobs(this.state.jobsTomorrow)}
                    </div>
            </div>
        );
    }
}

export default Todo;
import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api/";

class databaseService {

    getJobs(){
        return axios.get(API_BASE_URL + 'jobs');
    }

    getJob(jobID) {
        return axios.get(API_BASE_URL + 'job/' + jobID);
    }

    getEvents(){
        return axios.get(API_BASE_URL + 'events');
    }

    getEvent(eventID) {
        return axios.get(API_BASE_URL + 'event/' + eventID);
    }

    getDates(){
        return axios.get(API_BASE_URL + 'dates');
    }

    getDate(dateID) {
        return axios.get(API_BASE_URL + 'date/' + dateID);
    }

    getJobsOnDate(date) {
        return axios.get(API_BASE_URL + 'date/job/' + date);
    }

    getEventsOnDate(date) {
        return axios.get(API_BASE_URL + 'date/event/' + date);
    }

    getJobsFromDate(date) {
        return axios.get(API_BASE_URL + 'date/job/from/' + date);
    }

    getEventsFromDate(date) {
        return axios.get(API_BASE_URL + 'date/event/from/' + date);
    }
}

export default new databaseService()


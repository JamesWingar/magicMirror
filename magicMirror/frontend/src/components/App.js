import React, { Component } from "react";
import { render } from "react-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Clock from "./ClockModule";
import Todo from "./TodoModule";
import Weather from "./WeatherModule";
import Calendar from "./CalendarModule";


class App extends Component {
    constructor(props) {
        super(props);
    }

    // read in what apps are to be shown
    // display apps in right or left

    // fade in and out the apps that are wanted and not

    render() {
        return (
            <Container id="PageContainer"  fluid>
                <Row>
                    <Col>
                        <Clock />
                        <Weather />
                        <Todo />
                    </Col>
                    <Col md={6}>
                    </Col>
                    <Col>
                        <Calendar />
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default App;

render(<App />, document.getElementById("app"));

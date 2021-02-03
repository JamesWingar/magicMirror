import React, { Component } from "react";
import { render } from "react-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Clock from "./ClockModule";
import Todo from "./TodoModule";
import Weather from "./WeatherModule";


class App extends Component {
    constructor(props) {
        super(props);
    }

    // read in what apps are to be shown
    // display apps in right or left

    render() {
        return (
            <Container id="PageContainer"  fluid>
                <Row>
                    <Col>
                        <h2>Left Column</h2>
                        <Clock />
                        <Weather />
                        <Todo />
                    </Col>
                    <Col md={6}>
                        <h2>Middle Column</h2>
                    </Col>
                    <Col>
                        <h2>Right Column</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default App;

render(<App />, document.getElementById("app"));

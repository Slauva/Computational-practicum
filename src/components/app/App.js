import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {
    Container,
    Row, Col,
} from "react-bootstrap";
import Graph from "../graph";
import Header from "../header";
import InputItem from "../form-item-input";
import CheckboxItem from "../form-item-checkbox";

export default class App extends Component {

    state = {
        "x0": Math.PI,
        "y0": 2,
        "X": 5 * Math.PI,
        "n": 20,
        "euler_method": true,
        "improved_euler_method": false,
        "runge_kutta_method": false,
    }

    onInput_x0 = (event) => {
        this.setState({
            "x0": +event.target.value
        })
    }

    onInput_y0 = (event) => {
        this.setState({
            "y0": +event.target.value
        })
    }

    onInput_x = (event) => {
        this.setState({
            "X": +event.target.value
        })
    }

    onInput_n = (event) => {
        this.setState({
            "n": +event.target.value
        })
    }

    onCheckEuler = () => {
        this.setState({
            euler_method: !this.state.euler_method
        })
    }

    onCheckImproved = () => {
        this.setState({
            improved_euler_method: !this.state.improved_euler_method
        })
    }

    onCheckRunge = () => {
        this.setState({
            runge_kutta_method: !this.state.runge_kutta_method
        })
    }

    render() {
        return (
            <Router>
                <Header/>
                <Container className={"mt-5"}>
                    <Row>
                        <Col xl={8}>
                            <Switch>
                                <Route path={"/"} exact>
                                    <Graph data={this.state} error={false}/>
                                </Route>
                                <Route path={"/error"}>
                                    <Graph data={this.state} error={true}/>
                                </Route>
                            </Switch>
                        </Col>
                        <Col xl={4}>
                            <InputItem id="px0" label="x_0" value={this.state.x0} onHandler={this.onInput_x0}/>
                            <InputItem id="py0" label="y_0" value={this.state.y0} onHandler={this.onInput_y0}/>
                            <InputItem id="px" label="X" value={this.state.X} onHandler={this.onInput_x}/>
                            <InputItem id="pn" label="N" value={this.state.n} onHandler={this.onInput_n}/>

                            <CheckboxItem id="c1" label="Euler's method"
                                          value={this.state.euler_method}
                                          onHandler={this.onCheckEuler}/>
                            <CheckboxItem id="c2" label="Improved Euler's method"
                                          value={this.state.improved_euler_method}
                                          onHandler={this.onCheckImproved}/>
                            <CheckboxItem id="c3" label="Runge-Kutta method"
                                          value={this.state.runge_kutta_method}
                                          onHandler={this.onCheckRunge}/>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}
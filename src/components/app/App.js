import {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {
    Navbar,
    Container,
    Nav, Row, Col,
    InputGroup, FormControl, Form,
} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Graph from "../graph";

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
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Computational Practicum</Navbar.Brand>
                        <Nav className="me-auto">
                            <LinkContainer to={"/"}>
                                <Nav.Link>Solutions of the equations</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/error"}>
                                <Nav.Link>Approximation errors</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Container>
                </Navbar>
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
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="p-x-0">x0</InputGroup.Text>
                                <FormControl
                                    placeholder="Parameter x0"
                                    aria-label="x0"
                                    aria-describedby="p-x-0"
                                    value={this.state.x0}
                                    onChange={this.onInput_x0}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="p-y-0">y0</InputGroup.Text>
                                <FormControl
                                    placeholder="Parameter y0"
                                    aria-label="y0"
                                    aria-describedby="p-y-0"
                                    value={this.state.y0}
                                    onChange={this.onInput_y0}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="p-x">X</InputGroup.Text>
                                <FormControl
                                    placeholder="Parameter X"
                                    aria-label="X"
                                    aria-describedby="p-x"
                                    value={this.state.X}
                                    onChange={this.onInput_x}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="p-n">N</InputGroup.Text>
                                <FormControl
                                    placeholder="Parameter N"
                                    aria-label="N"
                                    aria-describedby="p-n"
                                    value={this.state.n}
                                    onChange={this.onInput_n}
                                />
                            </InputGroup>
                            <Form.Group className="mb-3" controlId="check-1">
                                <Form.Check
                                    type="checkbox"
                                    label="Euler's method"
                                    checked={this.state.euler_method}
                                    onChange={this.onCheckEuler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="check-2">
                                <Form.Check
                                    type="checkbox"
                                    label="Improved Euler's method"
                                    checked={this.state.improved_euler_method}
                                    onChange={this.onCheckImproved}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="check-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Runge-Kutta method"
                                    checked={this.state.runge_kutta_method}
                                    onChange={this.onCheckRunge}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}
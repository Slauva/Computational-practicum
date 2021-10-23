import {Component} from 'react';
import {Line} from 'react-chartjs-2';
import EulerMethod from "../../services/EulerMethod";
import ImprovedEulerMethod from "../../services/ImprovedEulerMethod";
import ExactSolution from "../../services/ExactSolution";
import RungeKuttaMethod from "../../services/RungeKuttaMethod";

export default class Graph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {x0, y0, X, n, euler_method, improved_euler_method, runge_kutta_method} = this.props.data;
        let error = this.props.error;

        let exactSolution = new ExactSolution(x0, y0, X, n);
        let exa = exactSolution.getSolution();

        let euler = new EulerMethod(x0, y0, X, n, exa);
        let improved = new ImprovedEulerMethod(x0, y0, X, n, exa);
        let rungeKutta = new RungeKuttaMethod(x0, y0, X, n, exa)

        const data = {
            labels: euler.axis_x,
            datasets: []
        }

        if (euler_method) {
            let res = error ? euler.getErrorSolution() : euler.getSolution();
            let plot = {
                data: res.y,
                label: "Euler method",
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
            data.datasets.push(plot);
        }

        if (improved_euler_method) {
            let res = error ? improved.getErrorSolution() : improved.getSolution();
            let plot = {
                data: res.y,
                label: "Improved Euler method",
                fill: false,
                backgroundColor: 'rgb(255, 0, 255)',
                borderColor: 'rgba(255, 0, 255, 0.2)',
            }
            data.datasets.push(plot);
        }

        if (runge_kutta_method) {
            let res = error ? rungeKutta.getErrorSolution() : rungeKutta.getSolution();
            let plot = {
                data: res.y,
                label: "Runge-Kutta method",
                fill: false,
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255, 0.2)',
            }
            data.datasets.push(plot);
        }

        if (!error) {
            data.datasets.push({
                data: exa.y,
                label: "Exact Solution",
                fill: false,
                backgroundColor: 'rgb(0, 155, 132)',
                borderColor: 'rgba(0, 155, 132, 0.2)',
            })
        }

        return (
            <Line data={data}/>
        )
    }
}
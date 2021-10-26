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

    getPlotByMethod(method, type, flag, color, label) {
        if (!flag)
            return [null, {}];

        let res = null;
        switch (type) {
            case 1:
                res = method.getSolution();
                break;
            case 2:
                res = method.getLocalErrorSolution();
                break;
            case 3:
                res = method.getGlobalErrorSolution();
                break;
        }
        return [
            res.x,
            {
                data: res.y,
                label: label,
                fill: false,
                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                borderColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`,
            }
        ];
    }

    render() {
        let {x0, y0, X, n, maxN, euler_method, improved_euler_method, runge_kutta_method} = this.props.data;
        let error = this.props.error;

        let exactSolution = new ExactSolution(x0, y0, X, n, maxN);
        let exa = exactSolution.getSolution();

        let euler = new EulerMethod(x0, y0, X, n, maxN, exactSolution);
        let improved = new ImprovedEulerMethod(x0, y0, X, n, maxN, exactSolution);
        let rungeKutta = new RungeKuttaMethod(x0, y0, X, n, maxN, exactSolution)

        let [x_0, frame_0] = this.getPlotByMethod(euler, error, euler_method, [255, 99, 132], "Euler method");
        let [x_1, frame_1] = this.getPlotByMethod(improved, error, improved_euler_method, [255, 0, 255], "Improved Euler method");
        let [x_2, frame_2] = this.getPlotByMethod(rungeKutta, error, runge_kutta_method, [0, 0, 255], "Runge-Kutta method");

        const data = {
            labels: x_0 || x_1 || x_2 || exa.x,
            datasets: [
                frame_0,
                frame_1,
                frame_2,
            ]
        }
        if (error === 1) {
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
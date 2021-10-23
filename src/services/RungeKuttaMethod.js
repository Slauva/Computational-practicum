import Calculator from "./Calculator";

export default class RungeKuttaMethod extends Calculator {
    constructor(x0, y0, x, n, exactSolution) {
        super(x0, y0, x, n, exactSolution);
    }

    getSolution = () => {
        for (let i = 0; i < this.n - 1; i++) {
            let x = this.axis_x[i];
            let y = this.axis_y[i];

            let k1 = this.equation(x, y);
            let k2 = this.equation(x + this.h / 2, y + this.h * k1 / 2);
            let k3 = this.equation(x + this.h / 2, y + this.h * k2 / 2);
            let k4 = this.equation(x + this.h, y + this.h * k3);

            let y_new = y + this.h * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
            this.axis_y.push(y_new);
        }

        return {
            x: this.axis_x,
            y: this.axis_y
        }
    }

    getErrorSolution = () => {
        let res = this.getSolution();
        for (let i = 0; i < this.n; i++) {
            this.axis_y_error.push(Math.abs(this.exactSolution.y[i] - res.y[i]));
        }
        return {
            x: this.axis_x,
            y: this.axis_y_error
        }
    }
}
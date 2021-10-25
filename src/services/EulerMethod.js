import Calculator from "./Calculator";

export default class EulerMethod extends Calculator {
    constructor(x0, y0, x, n, exactSolution) {
        super(x0, y0, x, n, exactSolution);
    }

    getSolution = () => {
        for (let i = 0; i < this.n - 1; i++) {
            let x = this.axis_x[i];
            let y = this.axis_y[i];

            let y_new = y + this.h * this.equation(x, y);
            this.axis_y.push(y_new);
        }

        return {
            x: this.axis_x,
            y: this.axis_y
        }
    }

    getGlobalErrorSolution = () => {
        let res = this.getSolution();
        for (let i = 0; i < this.n; i++) {
            this.axis_y_error.push(Math.abs(this.exactSolution.y[i] - res.y[i]));
        }
        return {
            x: this.axis_x,
            y: this.axis_y_error
        }
    }

    getLocalErrorSolution = () => {
        let res = this.getSolution();
        for (let i = 0; i < this.n - 1; i++) {
            let t = res.y[i+1] - res.y[i] - this.h * this.equation(res.x[i], res.y[i]);
            this.axis_y_local.push(t);
        }
        this.axis_y_local.push(this.axis_y_local[this.n-1]);
        return {
            x: this.axis_x,
            y: this.axis_y_local
        }
    }
}
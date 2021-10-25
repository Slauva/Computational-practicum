import Calculator from "./Calculator";

export default class ImprovedEulerMethod extends Calculator {
    constructor(x0, y0, x, n, exactSolution) {
        super(x0, y0, x, n, exactSolution);
    }

    getSolution = () => {
        for (let i = 0; i < this.n - 1; i++) {
            let x = this.axis_x[i];
            let y = this.axis_y[i];

            let k1 = this.equation(x, y);
            let k2 = this.equation(x + this.h, y + this.h * k1);

            let y_new = y + this.h * (k1 + k2) / 2;
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
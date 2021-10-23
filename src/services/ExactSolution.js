import Calculator from "./Calculator";

export default class ExactSolution extends Calculator {
    constructor(x0, y0, x, n) {
        super(x0, y0, x, n, null);
        this.c = x0 * Math.sqrt(y0) - Math.sin(x0);
    }

    exact = (x) => {
        return Math.pow((Math.sin(x) + this.c),2) / Math.pow(x, 2);
    }

    getSolution = () => {
        for (let i = 1; i < this.n; i++) {
            let x = this.axis_x[i];
            this.axis_y.push(this.exact(x));
        }

        return {
            x: this.axis_x,
            y: this.axis_y
        }
    }
}
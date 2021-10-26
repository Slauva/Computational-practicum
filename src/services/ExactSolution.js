import Calculator from "./Calculator";

export default class ExactSolution extends Calculator {
    constructor(x0, y0, x, n) {
        super(x0, y0, x, n, null);
        this.c = x0 * Math.sqrt(y0) - Math.sin(x0);
    }

    exact = (x) => {
        return Math.pow((Math.sin(x) + this.c), 2) / Math.pow(x, 2);
    }

    getSolution = (n, h) => {
        let axis_y = [this.y0];
        let axis_x = [this.x0];

        h = !h ? this.h : h;
        n = !n ? this.n : n;

        for (let i = 1; i < n; i++) {
            axis_x.push(axis_x[i - 1] + h);
        }

        for (let i = 1; i < n; i++) {
            let x = axis_x[i];
            axis_y.push(this.exact(x));
        }

        return {
            x: axis_x,
            y: axis_y
        }
    }
}
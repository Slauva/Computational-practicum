export default class Calculator {
    constructor(x0, y0, x, n, maxN, exactSolution) {
        this.x0 = x0;
        this.y0 = y0;
        this.x = x;
        this.n = n;
        this.maxN = maxN;
        this.exactSolution = exactSolution

        this.h = (x - x0) / n;

        this.axis_x_global = [];
        for (let i = n; i < maxN; i++) {
            this.axis_x_global.push(i);
        }
    }

    equation = (x, y) => {
        return 2 * Math.pow(y, 0.5) * Math.cos(x) / x - 2 * y / x;
    }

    getSolution = () => {
        return;
    }

    getLocalErrorSolution = (n, h) => {
        let axis_y = [];

        h = !h ? this.h : h;
        n = !n ? this.n : n;

        let {x, y} = this.getSolution(n, h);
        let res = this.exactSolution.getSolution(n, h);

        for (let i = 0; i < n; i++) {
            axis_y.push(Math.abs(res.y[i] - y[i]));
        }

        return {
            x: x,
            y: axis_y,
            max_y: Math.max(...axis_y)
        }
    }

    getError = (n, h) => {
        let axis_y = []
        let {x, y} = this.getSolution(n, h);

        for (let i = 0; i< n-1; i++){
            let t = y[i+1] - y[i] - h * this.equation(x[i], y[i]);
            axis_y.push(t);
        }
        return Math.max(...axis_y);
    }

    getGlobalErrorSolution = () => {
        let axis_y = [];

        for (let step = this.n; step < this.maxN; step++) {
            let h = (this.x - this.x0) / step;

            let {max_y} = this.getLocalErrorSolution(step, h);
            axis_y.push(max_y);
        }

        console.log(axis_y);

        return {
            x: this.axis_x_global,
            y: axis_y
        }
    }
}
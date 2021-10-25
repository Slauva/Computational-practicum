export default class Calculator {
    constructor(x0, y0, x, n, exactSolution) {
        this.x0 = x0;
        this.y0 = y0;
        this.x = x;
        this.n = n;
        this.exactSolution = exactSolution

        this.h = (x - x0) / n;
        this.axis_x = [x0];
        this.axis_y = [y0];
        this.axis_y_error = [];
        this.axis_y_local = [];

        for (let i = 1; i < n; i++) {
            this.axis_x.push(this.axis_x[i-1] + this.h);
        }
    }

    equation = (x, y) => {
        return 2 * Math.pow(y, 0.5) * Math.cos(x) / x - 2 * y / x;
    }
}
import Calculator from "./Calculator";

export default class EulerMethod extends Calculator {
    constructor(x0, y0, x, n, maxN, exactSolution) {
        super(x0, y0, x, n, maxN, exactSolution);
    }

    getSolution = (n, h) => {
        let axis_y = [this.y0];
        let axis_x = [this.x0];

        h = !h ? this.h : h;
        n = !n ? this.n : n;

        for (let i = 1; i < n; i++) {
            axis_x.push(axis_x[i - 1] + h);
        }

        for (let i = 0; i < n - 1; i++) {
            let x = axis_x[i];
            let y = axis_y[i];

            let y_new = y + h * this.equation(x, y);
            axis_y.push(y_new);
        }

        return {
            x: axis_x,
            y: axis_y
        }
    }
}
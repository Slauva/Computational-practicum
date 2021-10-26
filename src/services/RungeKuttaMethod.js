import Calculator from "./Calculator";

export default class RungeKuttaMethod extends Calculator {
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

            let k1 = this.equation(x, y);
            let k2 = this.equation(x + h / 2, y + h * k1 / 2);
            let k3 = this.equation(x + h / 2, y + h * k2 / 2);
            let k4 = this.equation(x + h, y + h * k3);

            let y_new = y + h * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
            axis_y.push(y_new);
        }

        return {
            x: axis_x,
            y: axis_y
        }
    }
}
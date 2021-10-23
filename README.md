# Computational Practicum Report

* Slava Koshman
* v.koshman@innopolis.university

## 1.2 Computed Solution of Initial Value Problem (Graphs)

### Solution with different methods

![](https://i.imgur.com/J1uXMXL.png)

### Errors of numerical methods

![](https://i.imgur.com/3Aorwv1.png)


## 2. Code

### 2.1 UML Class Diagram

![](https://i.imgur.com/NGZ46HI.png)

### 2.2 Code comment

The web application is written in React App using libraries: React-Bootstrap & React-Bootstrap-Router for connecting ready-made styles and routing between charts, and the react-chartjs-2 library, which was engaged in drawing charts. The project uses a class of components that help structure the project for readability.

### 2.3 Project Structure 

### 2.3.1 *Class App*
Main class component to build a structure of the web application.

~~~jsx
class App extends Component {

    state = {
        "x0": Math.PI,
        "y0": 2,
        "X": 5 * Math.PI,
        "n": 20,
        "euler_method": true,
        "improved_euler_method": false,
        "runge_kutta_method": false,
    }

    onInput_x0 = (event) => {}

    onInput_y0 = (event) => {}

    onInput_x = (event) => {}

    onInput_n = (event) => {}

    onCheckEuler = () => {}

    onCheckImproved = () => {}

    onCheckRunge = () => {}

    render() {}
}
~~~

### 2.3.2 *Class Graph*
Main core to draw charts 

~~~jsx
class Graph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {x0, y0, X, n, euler_method, improved_euler_method, runge_kutta_method} = this.props.data;
        let error = this.props.error;

        let exactSolution = new ExactSolution(x0, y0, X, n);
        let exa = exactSolution.getSolution();

        let euler = new EulerMethod(x0, y0, X, n, exa);
        let improved = new ImprovedEulerMethod(x0, y0, X, n, exa);
        let rungeKutta = new RungeKuttaMethod(x0, y0, X, n, exa)

        const data = {
            labels: euler.axis_x,
            datasets: []
        }

        if (euler_method) {
            let res = error ? euler.getErrorSolution() : euler.getSolution();
            let plot = {
                data: res.y,
                label: "Euler method",
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
            data.datasets.push(plot);
        }

        if (improved_euler_method) {
            let res = error ? improved.getErrorSolution() : improved.getSolution();
            let plot = {
                data: res.y,
                label: "Improved Euler method",
                fill: false,
                backgroundColor: 'rgb(255, 0, 255)',
                borderColor: 'rgba(255, 0, 255, 0.2)',
            }
            data.datasets.push(plot);
        }

        if (runge_kutta_method) {
            let res = error ? rungeKutta.getErrorSolution() : rungeKutta.getSolution();
            let plot = {
                data: res.y,
                label: "Runge-Kutta method",
                fill: false,
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgba(0, 0, 255, 0.2)',
            }
            data.datasets.push(plot);
        }

        if (!error) {
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
~~~

### 2.3.3 *Class Calculator*
The main class of computations for processing methods and obtaining method solutions for DE.

~~~jsx
class Calculator {
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

        for (let i = 1; i < n; i++) {
            this.axis_x.push(this.axis_x[i-1] + this.h);
        }
    }

    equation = (x, y) => {
        return 2 * Math.pow(y, 0.5) * Math.cos(x) / x - 2 * y / x;
    }
}
~~~

### 2.3.4 *Class EulerMethod*
Calculator inherited class implemented to apply Euler's Method.

~~~jsx
EulerMethod extends Calculator {
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
~~~

### 2.3.5 *Class ImprovedEulerMethod*
Calculator inherited class implemented to apply Improved Euler's Method.

~~~jsx
ImprovedEulerMethod extends Calculator {
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
~~~

### 2.3.6 *Class RungeKuttaMethod*
A class inherited from Calculator is implemented to use the Runge-Kutta Method.

~~~jsx
RungeKuttaMethod extends Calculator {
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
~~~

### 2.3.7 *Class ExactSolution*
A class inherited from Calculator is implemented for using Exact Solution.

~~~jsx
ExactSolution extends Calculator {
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
~~~

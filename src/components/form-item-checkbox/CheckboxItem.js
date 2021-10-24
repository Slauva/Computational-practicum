import React, {Component} from "react";
import {Form} from "react-bootstrap";

export default class CheckboxItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {label, id, value, onHandler} = this.props;

        return (
            <Form.Group className="mb-3" controlId={id}>
                <Form.Check
                    type="checkbox"
                    label={label}
                    checked={value}
                    onChange={onHandler}
                />
            </Form.Group>
        );
    }
}
import React, {Component} from "react";
import {FormControl, InputGroup} from "react-bootstrap";

export default class InputItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {label, id, value, onHandler} = this.props;

        return (
            <InputGroup className="mb-3">
                <InputGroup.Text id={id}>{label}</InputGroup.Text>
                <FormControl
                    placeholder={`Parameter ${label}`}
                    aria-label={label}
                    aria-describedby={id}
                    value={value}
                    onChange={onHandler}
                />
            </InputGroup>
        );
    }
}
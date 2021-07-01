import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.grade}</td>
                <td>{this.props.obj.faculty}</td>
                <td>
                    <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link>
                </td>
            </tr>
        );
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class CourseTableRow extends Component {

    constructor(props) {
        super(props);
    }

   

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.major}</td>
                <td>{this.props.obj.semester}</td>
                <td>
                    <Link className="stu-link" to={"/student-list"}>
                        Students
                    </Link>
                </td>
            </tr>
        );
    }
}
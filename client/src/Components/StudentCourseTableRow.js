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
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.grade}</td>
                
                <td>
                    <Link className="stu-link" to={"/studentCourseGrade/" + this.props.obj.name}>
                        View
                    </Link>
                </td>
            </tr>
        );
    }
}
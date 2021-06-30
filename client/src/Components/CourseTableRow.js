import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class CourseTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse() {
        axios.delete('http://localhost:5000/courses/delete-course/' + this.props.obj._id)
            .then((res) => {
                console.log('Course successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.major}</td>
                <td>{this.props.obj.semester}</td>
                <td>
                    <Link className="edit-link" to={"/edit-course/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Link className="view-link" to={"/view-course/" + this.props.obj._id}>
                        View
                    </Link>
                    <Button onClick={this.deleteCourse} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}
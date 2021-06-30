import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";

export default class EditCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      id: "",
      description: "",
      major: "",
      semester: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/courses/view-course/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          name: res.data.name,
          id: res.data.id,
          description: res.data.description,
          major: res.data.major,
          semester: res.data.semester,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    // Redirect to Course List
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="CourseName">
            <h5>Course Name</h5>
            <td>{this.state.name}</td>
          </Form.Group>

          <Form.Group controlId="CourseID">
            <h5>Course ID</h5>
            <td>{this.state.id}</td>
          </Form.Group>

          <Form.Group controlId="Description">
            <h5>Course Description</h5>
            <td>{this.state.description}</td>
          </Form.Group>

          <Form.Group controlId="Major">
            <h5>Major</h5>
            <td>{this.state.major}</td>
          </Form.Group>

          <Form.Group controlId="Semester">
            <h5>Semester</h5>
            <td>{this.state.semester}</td>
          </Form.Group>

          <Link className="edit-link" to={"/course-list"}>
            Back to Courses List
          </Link>
        </Form>
      </div>
    );
  }
}

import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateCourse extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeCourseId = this.onChangeCourseId.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      id: '',
      description: '',
      major: '',
      semester: ''
    };
  }

  onChangeCourseName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeCourseId(e) {
    this.setState({ id: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeMajor(e) {
    this.setState({ major: e.target.value });
  }

  onChangeSemester(e) {
    this.setState({ semester: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const courseObject = {
      name: this.state.name,
      id: this.state.id,
      description: this.state.description,
      major: this.state.major,
      semester: this.state.semester
    };

    axios.post("http://localhost:8080/courses/create-course", courseObject).then((res) => console.log(res.data));

    this.setState({
      name: '',
      id: '',
      description: '',
      major: '',
      semester: ''
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="CourseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeCourseName}
            />
          </Form.Group>

          <Form.Group controlId="CourseID">
            <Form.Label>Course ID</Form.Label>
            <Form.Control
              type="text"
              value={this.state.id}
              onChange={this.onChangeCourseId}
            />
          </Form.Group>

          <Form.Group controlId="Description">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </Form.Group>

          <Form.Group controlId="Major">
            <Form.Label>Major</Form.Label>
            <Form.Control
              type="text"
              value={this.state.major}
              onChange={this.onChangeMajor}
            />
          </Form.Group>

          <Form.Group controlId="Semester">
            <Form.Label>Semester</Form.Label>
            <Form.Control
              type="text"
              value={this.state.semester}
              onChange={this.onChangeSemester}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Create Course
          </Button>
        </Form>
      </div>
    );
  }
}

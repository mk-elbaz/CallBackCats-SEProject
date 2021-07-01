import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.onChangeGrade = this.onChangeGrade.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      username: "",
      grade: "",
      faculty: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8080/user/edit-student/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          username: res.data.username,
          faculty: res.data.faculty,
          grade: res.data.grade,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeGrade(e) {
    this.setState({ grade: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const studentObject = {
      grade: this.state.grade,
    };

    axios
      .put(
        "http://localhost:8080/user/update-student/" +
          this.props.match.params.id,
        studentObject
      )
      .then((res) => {
        console.log(res.data);
        console.log("Student successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    // Redirect to Student List
    this.props.history.push("/student-list");
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <h5>UserName</h5>
            <td>{this.state.username}</td>
          </Form.Group>

          <Form.Group controlId="Grade">
            <h5>Course Grade</h5>
            <Form.Control
              type="text"
              value={this.state.grade}
              onChange={this.onChangeGrade}
            />
          </Form.Group>

          <Form.Group controlId="Faculty">
            <h5>Faculty</h5>
            <td>{this.state.faculty}</td>
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Update Student
          </Button>
        </Form>
      </div>
    );
  }
}

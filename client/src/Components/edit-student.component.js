import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onChangeGrade = this.onChangeGrade.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      email: '',
      rollno: '',
      grade: 'N/A',
      major: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,    
          major: res.data.major,
          rollno: res.data.rollno,
          grade : res.data.grade
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
  }

  onChangeGrade(e) {
    this.setState({ grade: e.target.value })
  }

  onChangeMajor(e) {
    this.setState({ major: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      major: this.state.major,
      rollno: this.state.rollno,
      grade: this.state.grade
    };

    axios.put('http://localhost:5000/students/update-student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/student-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="RollNo">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
        </Form.Group>

        <Form.Group controlId="Grade">
            <Form.Label>Course Grade</Form.Label>
            <Form.Control
              type="text"
              value={this.state.grade}
              onChange={this.onChangeGrade}
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


        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>);
  }
}
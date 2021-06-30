import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CourseTableRow from './CourseTableRow';


export default class CourseList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/courses/')
      .then(res => {
        this.setState({
          courses: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.courses.map((res, i) => {
      return <CourseTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Description</th>
            <th>Major</th>
            <th>Semester</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
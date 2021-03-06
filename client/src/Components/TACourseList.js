import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import TACourseTableRow from "./TACourseTableRow";
import AuthService from "../Services/AuthService";

export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    AuthService.viewCourses()
      .then((data) => {
        this.setState({
          courses: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.courses.map((res, i) => {
      return <TACourseTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Major</th>
              <th>Semester</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}

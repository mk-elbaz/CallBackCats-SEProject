import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import SCourseTableRow from "./StudentCourseTableRow";
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

     AuthService.grade().then(async (res) => {
       const cou = [];
       this.state.courses.forEach((course) => {
         course.grade = res;
         cou.push(course);
       })
       await this.setState({
        courses: cou,
      });
      //console.log(cou)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  DataTable() {
    return this.state.courses.map((y, i) => {
      return <SCourseTableRow obj={y} key={i} />;
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
              <th>Description</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}

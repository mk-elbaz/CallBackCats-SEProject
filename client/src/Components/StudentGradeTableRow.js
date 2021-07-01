import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default class StudentTableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.courseGrade[0].course}</td>
        <td>{this.props.obj.courseGrade[0].grade}</td>
      </tr>
    );
  }
}

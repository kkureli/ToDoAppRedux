import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import * as actionTypes from "./Store/actions";
import TasksMapper from "./mapTasks";
import { memo } from "react";
import style from "./Store/style.css";

const App = memo(props => {
  return (
    <div className="App">
      <Container fluid className="mt-3">
        <Row>
          <Col>
            <h1 className="text-light">ToDo List App</h1>
          </Col>
        </Row>
        <Row
          className="no-gutters mx-0"
          style={{ marginBottom: "50px", marginTop: "20px" }}
        >
          <Col>
            <form onSubmit={event => props.onSubmit(event)} action="">
              <TextField
                onChange={event => props.onTaskChange(event)}
                required
                id="standard-basic"
                label="Description"
              />

              <TextField
                required
                onChange={event => props.onDateChange(event)}
                id="date"
                label="Date"
                type="date"
                style={{ marginLeft: "15px" }}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <IconButton type="submit">
                <AddCircleIcon></AddCircleIcon>
              </IconButton>
            </form>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Done</th>
                    <th>Task</th>
                    <th>Date</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <TasksMapper></TasksMapper>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        {console.log("as", props.tasksList)}
      </Container>
    </div>
  );
});

const mapStateToProps = state => {
  return {
    task: state.task,
    date: state.date,
    tasksList: state.tasksList,
    done: state.done
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTaskChange: event => dispatch({ type: "taskOnChange", event: event }),
    onDateChange: event => {
      dispatch({ type: actionTypes.dateOnChange, event: event });
    },
    onSubmit: event => {
      dispatch({ type: actionTypes.formSubmit, event: event });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

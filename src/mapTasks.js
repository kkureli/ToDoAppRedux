import React from "react";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import uuid from "react-uuid";
import style from "./Store/style.css";

function mapTasks(props) {
  let editPressed = false;
  let dateEditPressed = false;

  let editButtonHandler = (taskId, doneBtnId, editBtnId) => {
    if (!editPressed) {
      editPressed = true;
      let doneIcon = document.getElementById(doneBtnId);
      doneIcon.classList.remove("hidden");
      let task = document.getElementById(taskId);
      task.contentEditable = "true";

      task.focus();
      let editBtn = document.getElementById(editBtnId);
      editBtn.classList.add("hidden");
    } else {
      editPressed = false;
      let doneIcon = document.getElementById(doneBtnId);
      doneIcon.classList.remove("hidden");
      let task = document.getElementById(taskId);
      task.contentEditable = "true";
      task.focus();
      let editBtn = document.getElementById(editBtnId);
      editBtn.classList.remove("hidden");
    }
  };

  let editDateHandler = (dateId, doneBtnId, editBtnId) => {
    if (!dateEditPressed) {
      dateEditPressed = true;
      let doneIcon = document.getElementById(doneBtnId);
      doneIcon.classList.remove("hidden");
      let task = document.getElementById(dateId);
      task.contentEditable = "true";
      console.log("t", dateId);

      task.focus();
      let editBtn = document.getElementById(editBtnId);
      editBtn.classList.add("hidden");
    } else {
      dateEditPressed = false;
      let doneIcon = document.getElementById(doneBtnId);
      doneIcon.classList.remove("hidden");
      let task = document.getElementById(dateId);
      task.contentEditable = "true";
      task.focus();
      let editBtn = document.getElementById(editBtnId);
      editBtn.classList.remove("hidden");
    }
  };

  let doneBtnPressed = (taskId, taskObjId) => {
    let updatedTask = document.getElementById(taskId).innerText;
    props.updateTask(updatedTask, taskObjId);
  };

  let doneDatePressed = (dateId, taskObjId) => {
    let updatedDate = document.getElementById(dateId).innerText;
    console.log(updatedDate);

    props.updateDate(updatedDate, taskObjId);
  };

  const mapTasksList = () => {
    return props.tasksList.map((task, index) => {
      let taskId = uuid();
      let doneBtnId = uuid();
      let editBtnId = uuid();
      let dateEditId = uuid();
      let dateDoneId = uuid();
      let dateId = uuid();
      return (
        <tr key={uuid()}>
          <td>
            <Checkbox
              checked={props.done.includes(task.id)}
              onChange={() => props.taskDone(task.id)}
              name="checkedB"
              color="primary"
            />
          </td>
          <td>
            <span
              id={taskId}
              className={props.done.includes(task.id) ? "done" : ""}
            >
              {task.task}{" "}
            </span>
            <i
              id={editBtnId}
              onClick={() => editButtonHandler(taskId, doneBtnId, editBtnId)}
              class={
                props.done.includes(task.id)
                  ? "hidden fas fa-pencil-alt"
                  : "fas fa-pencil-alt"
              }
              style={{ marginLeft: "15px" }}
            ></i>
            <i
              onClick={() => doneBtnPressed(taskId, task.id)}
              id={doneBtnId}
              style={{ marginLeft: "15px" }}
              class={
                editPressed
                  ? "fas fa-check-circle show"
                  : "hidden fas fa-check-circle "
              }
            ></i>
          </td>
          <td>
            <span
              id={dateId}
              className={props.done.includes(task.id) ? "done" : ""}
            >
              {task.date}
            </span>
            <i
              id={dateEditId}
              onClick={() => editDateHandler(dateId, dateDoneId, dateEditId)}
              class={
                props.done.includes(task.id)
                  ? "hidden fas fa-pencil-alt"
                  : "fas fa-pencil-alt"
              }
              style={{ marginLeft: "15px" }}
            ></i>
            <i
              onClick={() => doneDatePressed(dateId, task.id)}
              id={dateDoneId}
              style={{ marginLeft: "15px" }}
              class={
                editPressed
                  ? "fas fa-check-circle show"
                  : "hidden fas fa-check-circle "
              }
            ></i>
          </td>
          <td>
            <Button onClick={() => props.deleteBtnHandler(index)}>
              <i style={{ color: "red" }} class="fas fa-trash-alt fa-lg"></i>
            </Button>
          </td>
        </tr>
      );
    });
  };
  return mapTasksList();
}

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
    deleteBtnHandler: index => dispatch({ type: "taskRemove", index: index }),
    taskDone: id => dispatch({ type: "taskDone", id: id }),
    updateTask: (updatedTaskText, taskId) =>
      dispatch({
        type: "taskUpdate",
        updatedTaskText: updatedTaskText,
        taskId: taskId
      }),
    updateDate: (updatedTaskDate, taskId) =>
      dispatch({
        type: "dateUpdate",
        updatedDateText: updatedTaskDate,
        taskId: taskId
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mapTasks);

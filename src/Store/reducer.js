/* eslint-disable default-case */
import * as actionTypes from "./actions";
import uuid from "react-uuid";
import style from "./style.css";
const initialState = {
  task: "",
  date: "",
  tasksList: [{ task: "Shopping", date: "2020-03-11", id: uuid() }],
  done: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.taskOnChange:
      console.log(state);

      return {
        ...state,
        task: action.event.target.value
      };

    case actionTypes.dateOnChange:
      return {
        ...state,
        date: action.event.target.value
      };

    case actionTypes.formSubmit:
      action.event.preventDefault();
      let updatedTasks = [...state.tasksList];

      let obj = {
        task: state.task,
        date: state.date,
        id: uuid()
      };

      updatedTasks.push(obj);

      return {
        ...state,
        tasksList: updatedTasks
      };

    case actionTypes.taskRemove:
      let removedTasksList = [...state.tasksList];
      removedTasksList.splice(action.index, 1);
      return {
        ...state,
        tasksList: removedTasksList
      };

    case actionTypes.taskDone:
      if (!state.done.includes(action.id)) {
        let doneUpdated = [...state.done];
        doneUpdated.push(action.id);
        return {
          ...state,
          done: doneUpdated
        };
      } else {
        let doneUpdated = [...state.done];
        doneUpdated.splice(doneUpdated.indexOf(action.id), 1);
        return {
          ...state,
          done: doneUpdated
        };
      }
    case actionTypes.taskUpdate:
      let tasksArr = [...state.tasksList];
      let task = tasksArr.find(task => {
        return task.id === action.taskId;
      });
      task.task = action.updatedTaskText;

      return {
        ...state,
        tasksList: tasksArr
      };
    case actionTypes.dateUpdate:
      let tasksArray = [...state.tasksList];
      let tasks = tasksArray.find(task => {
        return task.id === action.taskId;
      });
      tasks.date = action.updatedDateText;

      return {
        ...state,
        tasksList: tasksArray
      };
  }
  return state;
};

export default reducer;

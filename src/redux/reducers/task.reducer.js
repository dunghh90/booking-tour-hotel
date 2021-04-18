const initialState = {
  toDoList: [],
  taskDetail: {},
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      return {
        ...state,
        toDoList: [
          ...state.toDoList,
          action.payload,
        ],
      };
    }
    case 'EDIT_TASK': {
      const { index, title, description } = action.payload;
      const newToDoList = state.toDoList;
      newToDoList.splice(index, 1, { title: title, description: description });
      return {
        ...state,
        toDoList: [
          ...newToDoList,
        ],
      };
    }
    case 'DELETE_TASK': {
      const { index } = action.payload;
      const newToDoList = state.toDoList;
      newToDoList.splice(index, 1);
      return {
        ...state,
        toDoList: [
          ...newToDoList,
        ],
      };
    }
    case 'GET_TASK_DETAIL': {
      const { index } = action.payload;
      const taskDetail = state.toDoList[index] ? state.toDoList[index] : {};
      return {
        ...state,
        taskDetail: taskDetail,
      };
    }
    default: {
      return state;
    }
  }
}

export default taskReducer;

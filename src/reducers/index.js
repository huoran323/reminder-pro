import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER } from "../constants";

const reminder = action => {
  const { text, dueDate } = action;
  return {
    text,
    dueDate,
    id: Math.random()
  };
};

// reducer接收一个state 和一个action
const reminderReducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_REMINDER:
      return [...state, reminder(action)];
    case DELETE_REMINDER:
      return state.filter(reminder => reminder.id !== action.id);
    case CLEAR_REMINDER:
      return [];
    default:
      return state;
  }
};

export default reminderReducer;

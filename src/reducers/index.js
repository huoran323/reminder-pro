import { ADD_REMINDER } from "../constants";

const reminder = action => {
  return {
    text: action.text,
    id: Math.random()
  };
};

// reducer接收一个state 和一个action
const reminderReducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_REMINDER:
      return [...state, reminder(action)];
    default:
      return state;
  }
};

export default reminderReducer;

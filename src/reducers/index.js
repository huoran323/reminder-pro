import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER } from "../constants";
// 使用sfcookies将数据存储到浏览器的cookie中
import { bake_cookie, read_cookie } from "sfcookies";

const reminder = action => {
  const { text, dueDate } = action;
  return {
    text,
    dueDate,
    id: Math.random()
  };
};

// reducer接收一个state 和一个action
const reminderReducer = (
  //通过read_cookie读取浏览器存储的cookie
  state = read_cookie("reminders") || [],
  action = {}
) => {
  let reminders = null;

  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      //以key value方式进行存储
      bake_cookie("reminders", reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = state.filter(reminder => reminder.id !== action.id);
      bake_cookie("reminders", reminders);
      return reminders;
    case CLEAR_REMINDER:
      reminders = [];
      bake_cookie("reminders", reminders);
      return reminders;
    default:
      return state;
  }
};

export default reminderReducer;

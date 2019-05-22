import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import { addReminder, deleteReminder, clearReminders } from "../actions";

class App extends React.Component {
  state = {
    text: "",
    dueDate: ""
  };

  addReminder = () => {
    // 此处可以取出connect传递过来的action函数
    // 调用actions中的addReminder函数，将输入的内容传递过去进行处理，再触发reducer更新新的state,通过mapStateToProps将新的state返回给组件的props属性
    this.props.addReminder(this.state.text, this.state.dueDate);
  };

  deleteClick(id) {
    // console.log("id ---", id);
    this.props.deleteReminder(id);
  }

  clearReminders() {
    this.props.clearReminders();
  }

  renderReminders() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-sm-8 mt-2">
        {reminders.map(reminder => (
          <li key={reminder.id} className="list-group-item">
            <div className="list-item">
              <div>{reminder.text}</div>
              <div>
                <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
              </div>
            </div>
            <div
              className="list-item delete-button"
              onClick={() => this.deleteClick(reminder.id)}
            >
              &#x2715;
            </div>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>

        <div className="form-inline">
          <div className="form-group mr-2">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="I have to ..."
              onChange={event => {
                this.setState({ text: event.target.value });
              }}
            />
            <input
              type="datetime-local"
              className="form-control mr-2"
              onChange={event => {
                this.setState({ dueDate: event.target.value });
              }}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={this.addReminder}
            >
              Add Reminder
            </button>
          </div>
        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger mt-3"
          onClick={() => this.clearReminders()}
        >
          Clear Reminder
        </div>
      </div>
    );
  }
}

App.propTypes = {
  reminders: PropTypes.array.isRequired,
  addReminder: PropTypes.func.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  clearReminders: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log("state --- ", state);
  return {
    reminders: state
  };
};
export default connect(
  mapStateToProps,
  // action中的addReminder函数
  { addReminder, deleteReminder, clearReminders }
)(App);

import React from "react";
import { connect } from "react-redux";

import { addReminder } from "../actions";

class App extends React.Component {
  state = {
    text: ""
  };

  addReminder = () => {
    // 此处可以取出connect传递过来的action函数
    this.props.addReminder(this.state.text);
  };

  renderReminders() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-sm-8 mt-2">
        {reminders.map(reminder => (
          <li key={reminder.id} className="list-group-item">
            <div className="list-item">
              <div>{reminder.text}</div>
              <div>
                <em>time</em>
              </div>
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
              className="form-control"
              placeholder="I have to ..."
              onChange={event => {
                this.setState({ text: event.target.value });
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state --- ", state);
  return {
    reminders: state
  };
};
export default connect(
  mapStateToProps,
  { addReminder }
)(App);

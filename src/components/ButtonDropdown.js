import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import onClickOutside from "react-onclickoutside";

class ButtonDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      label: this.props.label,
      selectedValue: this.props.selectedValue
    };
  }

  handleClickOutside(e) {
    this.setState({
      listOpen: false
    });
  }

  selectItem = (title, id, stateKey) => {
    this.setState(
      { selectedValue: title, listOpen: false },
      this.props.resetThenSet(title, id, stateKey)
    );
  };

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  render() {
    const { list } = this.props;
    const { listOpen, label, selectedValue } = this.state;
    return (
      <div className="dropdown-wrapper">
        <button className="button dropdown-header" onClick={this.toggleList}>
          <span>{label}:</span>
          <span>{selectedValue}</span>
          <span className="arrow-down" />
        </button>
        {listOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-menu-label">Select {label}</div>
            <ul className="dropdown-list">
              {list.map(item => (
                <li
                  className={`dropdown-list-item ${
                    item.selected ? "selected" : ""
                  }`}
                  key={item.id}
                  onClick={() => this.selectItem(item.title, item.id, item.key)}
                >
                  {item.title} {item.selected && <FontAwesome name="check" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(ButtonDropdown);

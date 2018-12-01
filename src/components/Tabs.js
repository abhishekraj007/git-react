import React, { Component } from "react";

export class Tabs extends Component {
  state = { selected: this.props.selected };

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab);
  }

  renderTabList(child) {
    let tab = 0;

    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, childTab => {
        if (childTab.type.name === "Tab") {
          const _isActive = tab === this.state.selected;
          const _onClick = this.handleClick(tab);

          tab++;

          return React.cloneElement(childTab, { _isActive, _onClick });
        }

        return childTab;
      })
    });
  }

  renderChildren(children) {
    let panel = 0;

    return React.Children.map(children, child => {
      if (child.type.name === "TabList") {
        return this.renderTabList(child);
      }

      if (child.type.name === "TabPanel") {
        const _isActive = panel === this.state.selected;

        panel++;

        return React.cloneElement(child, { _isActive });
      }

      return child;
    });
  }

  render() {
    return (
      <div className="Tabs">{this.renderChildren(this.props.children)}</div>
    );
  }
}

export const TabList = ({ children }) => (
  <nav className="TabList">{children}</nav>
);

export const Tab = ({ _onClick, _isActive, children }) => (
  <a
    href="javascript:void(0)"
    className={`Tab ${_isActive ? "is-active" : ""}`}
    onClick={_onClick}
  >
    {children}
  </a>
);

export const TabPanel = ({ _isActive, children }) => (
  <div className={`TabPanel ${_isActive ? "is-active" : ""}`}>{children}</div>
);

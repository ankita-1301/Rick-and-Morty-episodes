import React from "react";
import "../../styles.css";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

export default class Navigation extends React.Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        className="nav-menu"
        selectedKeys={[]}
        data-test="nav-menu"
      >
        <Menu.Item key="1">
          <NavLink to={`/`} />
          HOME
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to={`/episodes`} />
          EPISODES
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to={`/characters`} />
          CHARACTERS
        </Menu.Item>
      </Menu>
    );
  }
}

import React from "react";
import "../styles.css";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

export default class Navigation extends React.Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: "64px" }}
        selectedKeys={[]}
      >
        <Menu.Item key="1">
          <NavLink to={`/`} />
          HOME
        </Menu.Item>
      </Menu>
    );
  }
}

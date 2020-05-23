import React from "react";
// import "../styles.css";
import "antd/dist/antd.css";
import { Table, Button, Divider, notification, Icon, PageHeader } from "antd";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Title"
          //   breadcrumb={{ routes }}
          subTitle="This is a subtitle"
        />
      </div>
    );
  }
}

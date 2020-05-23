import React from "react";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import { Route } from "react-router";
import { Layout } from "antd"; //Using Ant Design for UI

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Navigation /> {/* Rendering Navigation Component */}
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div
              style={{
                background: "#fff",
                padding: 24,
                minHeight: "100em",
              }}
            >
              <Route exact path="/" component={HomePage} />
              {/* Rendering HomePage Component */}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Footer text here</Footer>
        </Layout>
      </div>
    );
  }
}

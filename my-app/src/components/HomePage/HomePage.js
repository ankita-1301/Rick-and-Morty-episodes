import React from "react";
import "antd/dist/antd.css";
import "../../styles.css";
import { PageHeader, Carousel } from "antd";

//Component for home page rendering carousel of images
export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Welcome to Rick and Morty show"
          data-test="homepage-header"
        />
        <Carousel autoplay dots={true} key="carousel">
          <img
            src="/images/homeimage.jpg"
            alt="Girl in a jacket"
            width="100%"
            height="600"
          />

          <img
            src="/images/homeimage2.jpg"
            alt="Girl in a jacket"
            width="100%"
            height="600"
          />

          <img
            src="/images/homeimage3.jpg"
            alt="Girl in a jacket"
            width="100%"
            height="600"
          />

          <img
            src="/images/homeimage4.jpg"
            alt="Girl in a jacket"
            width="100%"
            height="600"
          />

          <img
            src="/images/homeimage5.jpg"
            alt="Girl in a jacket"
            width="100%"
            height="600"
          />
        </Carousel>
      </div>
    );
  }
}

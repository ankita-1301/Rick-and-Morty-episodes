import React from "react";
import Enzyme, { shallow } from "enzyme";
import HomePage from "./HomePage";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//test setup for homePage component

const findByAttri = (component, attri) => {
  const wrapper = component.find(`[data-test="${attri}"]`);
  return wrapper;
};

const setUp = (props = {}) => {
  const component = shallow(<HomePage {...props} />);
  return component;
};

describe("Test HomePage component", () => {
  describe("Has prop title", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        title: "Welcome to Rick and Morty show",
      };
      wrapper = setUp(props);
    });

    it("Renders HomePage without error", () => {
      const component = findByAttri(wrapper, `homepage-header`);
      expect(component.length).toBe(1);
    });
  });
});

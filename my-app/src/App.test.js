import React from "react";
import Enzyme, { shallow } from "enzyme";
import App from "./App";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//test setup for app component

const findByAttri = (component, attri) => {
  const wrapper = component.find(`[data-test="${attri}"]`);
  return wrapper;
};

const setUp = (props = {}) => {
  const component = shallow(<App {...props} />);
  return component;
};

describe("Test app component", () => {
  describe("Has prop title", () => {
    let wrapper;
    beforeEach(() => {
      const props = {};
      wrapper = setUp(props);
    });

    it("Renders app without error", () => {
      const component = findByAttri(wrapper, `app-div`);
      expect(component.length).toBe(1);
    });
  });
});

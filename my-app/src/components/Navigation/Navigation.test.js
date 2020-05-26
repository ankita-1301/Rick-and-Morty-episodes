import React from "react";
import Enzyme, { shallow } from "enzyme";
import Navigation from "./Navigation";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//test setup for navigation component

const findByAttri = (component, attri) => {
  const wrapper = component.find(`[data-test="${attri}"]`);
  return wrapper;
};

const setUp = (props = {}) => {
  const component = shallow(<Navigation {...props} />);
  return component;
};

describe("Test navigation component", () => {
  describe("Has prop title", () => {
    let wrapper;
    beforeEach(() => {
      const props = {};
      wrapper = setUp(props);
    });

    it("Renders navigation without error", () => {
      const component = findByAttri(wrapper, `nav-menu`);
      expect(component.length).toBe(1);
    });
  });
});

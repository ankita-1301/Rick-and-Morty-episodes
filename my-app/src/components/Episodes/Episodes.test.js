import React from "react";
import Enzyme, { shallow } from "enzyme";
import Episodes from "./Episodes";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//test setup for episodes component

test("Episodes component snapshot", () => {
  const characters = renderer.create(<Episodes />);
  let charTree = characters.toJSON();
  expect(charTree).toMatchSnapshot();
});

const findByAttri = (component, attri) => {
  const wrapper = component.find(`[data-test="${attri}"]`);
  return wrapper;
};

const setUp = (props = {}) => {
  const component = shallow(<Episodes {...props} />);
  return component;
};

describe("Test episodes component", () => {
  describe("Has prop title", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        title: "All episodes of Ricky and Morty",
      };
      wrapper = setUp(props);
    });

    it("Renders episodes without error", () => {
      const component = findByAttri(wrapper, `episodes-card`);
      expect(component.length).toBe(1);
    });
  });
});

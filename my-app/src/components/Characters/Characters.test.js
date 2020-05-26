import React from "react";
import Enzyme, { shallow } from "enzyme";
import Characters from "./Characters";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("Characters component snapshot", () => {
  const characters = renderer.create(<Characters />);
  let charTree = characters.toJSON();
  expect(charTree).toMatchSnapshot();
});

const findByAttri = (component, attri) => {
  const wrapper = component.find(`[data-test="${attri}"]`);
  return wrapper;
};

const setUp = (props = {}) => {
  const component = shallow(<Characters {...props} />);
  return component;
};

describe("Test characters component", () => {
  describe("Has prop title", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        title: "All characters of Ricky and Morty episodes",
      };
      wrapper = setUp(props);
    });

    it("Renders characters without error", () => {
      const component = findByAttri(wrapper, `characters-card`);
      expect(component.length).toBe(1);
    });
  });
});

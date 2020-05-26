import React from "react";
import Enzyme, { shallow } from "enzyme";
import CharacterView from "./CharacterView";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const state = {
  state: {
    data: {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth (Replacement Dimension)",
        url: "https://rickandmortyapi.com/api/location/20",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
        "https://rickandmortyapi.com/api/episode/3",
      ],
      url: "https://rickandmortyapi.com/api/character/2",
      created: "2017-11-04T18:50:21.651Z",
    },
  },
};

const props = {};

test("Characters component snapshot", () => {
  const characterView = renderer.create(
    <CharacterView {...props} location={state} />
  );
  let charTree = characterView.toJSON();
  expect(charTree).toMatchSnapshot();
});

describe("Test characters component", () => {
  describe("Has rendered with mock props", () => {
    let component;
    beforeEach(() => {
      component = shallow(<CharacterView {...props} location={state} />);
    });

    it("Renders characters without error", () => {
      expect(component.length).toBe(1);
    });
  });
});

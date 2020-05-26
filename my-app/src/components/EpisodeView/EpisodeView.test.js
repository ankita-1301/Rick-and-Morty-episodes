import React from "react";
import Enzyme, { shallow } from "enzyme";
import EpisodeView from "./EpisodeView";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//test setup for episodeView component

const state = {
  state: {
    data: {
      id: 2,
      name: "Lawnmower Dog",
      air_date: "December 9, 2013",
      episode: "S01E02",
      characters: [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
      ],
      url: "https://rickandmortyapi.com/api/episode/2",
      created: "2017-11-10T12:56:33.916Z",
    },
  },
};

const props = {};

test("EpisodeView component snapshot", () => {
  const episodeView = renderer.create(
    <EpisodeView {...props} location={state} />
  );
  let epiTree = episodeView.toJSON();
  expect(epiTree).toMatchSnapshot();
});

describe("Test episode view component", () => {
  describe("Has rendered with mock props", () => {
    let component;
    beforeEach(() => {
      component = shallow(<EpisodeView {...props} location={state} />);
    });

    it("Renders episode view without error", () => {
      expect(component.length).toBe(1);
    });
  });
});

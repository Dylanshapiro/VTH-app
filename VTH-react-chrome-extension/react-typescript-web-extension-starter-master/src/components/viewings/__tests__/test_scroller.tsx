import * as React from "react";
import { Viewings } from "../component";
import renderer from "react-test-renderer";

it("component renders", () => {
    const tree = renderer.create(<Viewings />).toJSON();
    expect(tree).toMatchSnapshot();
});

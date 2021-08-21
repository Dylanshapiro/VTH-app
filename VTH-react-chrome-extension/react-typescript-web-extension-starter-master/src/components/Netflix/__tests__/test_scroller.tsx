import * as React from "react";
import { Netflix } from "../component";
import renderer from "react-test-renderer";

it("component renders", () => {
    const tree = renderer.create(<Netflix />).toJSON();
    expect(tree).toMatchSnapshot();
});

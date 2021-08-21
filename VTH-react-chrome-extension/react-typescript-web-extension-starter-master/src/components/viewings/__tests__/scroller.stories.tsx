import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Viewings } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("Viewings", module).add("renders", () => {
    return (
        <Story>
            <Viewings />
        </Story>
    );
});

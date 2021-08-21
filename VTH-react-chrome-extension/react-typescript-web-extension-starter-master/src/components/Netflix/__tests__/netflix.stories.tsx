import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Netflix } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("Netflix", module).add("renders", () => {
    return (
        <Story>
            <Netflix />
        </Story>
    );
});

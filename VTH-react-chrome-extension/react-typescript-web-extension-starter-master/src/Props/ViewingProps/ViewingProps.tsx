import React, { FunctionComponent } from 'react'; // importing FunctionComponent

import { ViewingType} from "@src/Types/ViewingTypes";


type ViewingProps = {
    viewingtype: ViewingType
}

// type ViewingsProps = {
//     viewings: Array<ViewingType>, year: Number
// }

export const ViewingProp: FunctionComponent<ViewingProps> = ({ viewingtype }) => <a href={viewingtype.titleURL.href}> {viewingtype.titleURL}</a>


// export const ViewingsProp:  FunctionComponent<ViewingsProps> = ({viewings}): void[]=> 
// {
//     const listViewingProps = viewings.map((el: ViewingType)=> {
//         <ViewingProp viewingtype={el} />
//     });

//     return listViewingProps
// }
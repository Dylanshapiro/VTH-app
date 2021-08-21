import React, { FunctionComponent } from "react";
import "./styles.scss";
import { browser, Tabs } from "webextension-polyfill-ts";
import { render } from "react-dom";
import { URL, Url, UrlObject } from "url";
//import { ViewingProp } from "@src/Props/ViewingProps";
import { ViewingType } from "@src/Types/ViewingTypes";

// // // //
type ViewingProps = {
  viewingtype: ViewingType
}

function openTab(link:string)
{
  browser.tabs.create({url:link})
  return false
}

export const ViewingProp: FunctionComponent<ViewingProps> = ({ viewingtype }) => <a href={viewingtype.titleURL.toString()} onClick={() => openTab(viewingtype.titleURL.toString())} > {viewingtype.title}</a>

interface IProps {
}

interface IState {
  loading: Boolean;
  viewings: Map<Number, Array<ViewingType>>
}




export class Viewings extends React.Component<IProps, IState> {
  // ------------------------------------------^
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      viewings: new Map<Number, Array<ViewingType>>()
    };
     browser.runtime.sendMessage({ msg: "DISPLAY_DATA" });
    browser.runtime.onMessage.addListener((
      request: {
        msg: String,
        content: string
      }
    ): void => {
      if ("DISPLAY_HISTORY" === request.msg) {
        let viewingmap = convertResponseToMap(request.content)
        console.log(request.content)
        console.log(viewingmap)
        this.setState({
          loading: false, viewings: viewingmap
        })
      }
    }
    )
  }



  render() {
    //   if(this.state.loading === true){
    //     const promise = browser.runtime.sendMessage({ msg: "DISPLAY_DATA" }).then((response) => {

    let arr_of_props = viewingsProp(this.state.loading, this.state.viewings)
    return (

      <div className="row">
        <div className="col-lg-12">
          {arr_of_props}
        </div>
      </div>
    );
  }
}

function viewingsProp(loading: Boolean, viewings: Map<Number, Array<ViewingType>>) {
  if (loading && viewings.size === 0) {
    return <p> Please Wait Content is Loading</p>;
  }
  else {

    let array = new Array<any>()

    viewings.forEach((value: Array<ViewingType>, year: Number) => {
      array.push(<h3> In {year} today you watched: </h3>)
      value.forEach((el: ViewingType) =>
        array.push(<ViewingProp viewingtype={el} />)
      );
    });
    return array;
  }
}
// function displayViewingsArrayProp(props: { viewing: Array<ViewingType>, year: Number}) {
//   let array = new Array<any>(<p>{props.year}</p>)

//   props.viewing.forEach((el: ViewingType)=> {
//     array.push(<displayViewing viewing={el} />)
//     });

//   return 
// }

// function displayViewing(props: { viewing: ViewingType}) {
//   return <a href={props.viewing.titleURL.href}> {props.viewing.titleURL}</a>;
// }

function convertResponseToMap(viewingList: string): Map<Number, Array<ViewingType>> {
  const obj = JSON.parse(viewingList);
  let map = new Map<Number, Array<ViewingType>>()
  obj.forEach((element: any) => {
    const keyYear = element.at(0) as Number;
    const viewings = element.at(1);
    let arraytoMap = new Array<ViewingType>()
    viewings.forEach((element: string) => {
      let el = JSON.parse(element)
      const dateObj = new Date(el.date)
      const title = el.title
      const url = el.link
      const viewingtype = {
        date: dateObj,
        title: title,
        titleURL: url
      } as ViewingType
      arraytoMap.push(viewingtype)
    });
    if (arraytoMap.length !== 0)
      map.set(keyYear, arraytoMap)

  });
  return map
}

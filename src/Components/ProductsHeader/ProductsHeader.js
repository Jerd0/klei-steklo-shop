import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router-dom";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/fall-animation/fall-animation.scss";
import MAIN1 from "../../Asserts/MAIN1.jpg";
import MAIN2 from "../../Asserts/MAIN2.jpg";
import MAIN3 from "../../Asserts/MAIN3.jpg";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
const AutoplaySlider = withAutoplay(AwesomeSlider);
class ProductsHeader extends Component {
  state = {
    openPriceDialog: false
  };

  render() {
    let { parsedQueryStr, totalItemsCount, updateQueryStr } = this.props;

    // Lot of values come from the query string.
    let sortValue = parsedQueryStr.sortValue || "lh";
    let keyword = parsedQueryStr.term;
    let category = parsedQueryStr.category;

    let subtitle = (
      <div>
        <span style={{ fontSize: 12, color: "gray" }}>
          {totalItemsCount +
            " результат" +
            (totalItemsCount === 1 ? " " : "ов ") +
            (keyword ? "по запросу " : "")}
        </span>
        {keyword && (
          <span
            style={{
              fontWeight: "bold",
              fontSize: 12,
              color: "gray"
            }}
          >
            {keyword}
          </span>
        )}
      </div>
    );

    return (
      <div>
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={6000}
            animation="fallAnimation"
            cssModule={[CoreStyles, AnimationStyles]}
            style={{maxWidth:'100%', marginBottom:'5%', marginLeft:'2%', marginRight:'2%'}}
        >
          <div><img
              style={{maxWidth:'100%', maxHeight:'100%' }}
              src={MAIN1} alt={'Клеим стёлка'}/></div>
          <div> <img style={{maxWidth:'100%', maxHeight:'100%'}} alt={'Клеим стёлка'} src={MAIN2} /></div>
          <div> <img style={{maxWidth:'100%', maxHeight:'100%'}}  alt={'Клеим стёлка'} src={MAIN3} /></div>
        </AutoplaySlider>
        <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 24 }}>

            <div>{category ? category : "Популярные продукты"}</div>
            {subtitle}
          </div>
          <Select
            value={sortValue}
            onChange={e => {
              updateQueryStr({ sortValue: e.target.value });
            }}
          >
            <MenuItem value={"lh"}>Сортировка по алфавиту: по возрастанию</MenuItem>
            <MenuItem value={"hl"}>Сортировка по алфавиту: по убыванию</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductsHeader);

import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withRouter } from "react-router-dom";
class ProductsHeader extends Component {
    render() {
    let { parsedQueryStr, totalItemsCount, updateQueryStr } = this.props;

    // Lot of values come from the query string.
      let category = parsedQueryStr.category;
    let sortValue = parsedQueryStr.sortValue || "lh";
    let keyword = parsedQueryStr.term;
    let subtitle = (
      <div>
        <span style={{ fontSize: 28, color: "gray" }}>
          {totalItemsCount +
            " результат" +
            (totalItemsCount === 1 ? " " : "ов ") +
            (keyword ? "по запросу " : "")}
        </span>
        {keyword && (
          <span
            style={{
              fontWeight: "bold",
              fontSize: 28,
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

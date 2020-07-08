import { sampleProducts } from "./Data";

///
//
// Methods of this class are used to simulate calls to server.
//
class Api {
  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = sampleProducts.filter(x => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  sortByName(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a,b)=> (a.name>b.name)*2-1)
    } else {
      items.sort((a, b) => (b.name>a.name)*2-1);
    }

    return items;
  }
  searchItems({
    category = "popular",
    term = "",
    sortValue = "lh",
    itemsPerPage = 12,

    page = 1
  }) {
    // Turn this into a boolean

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = sampleProducts.filter(item => {

          if (category === "popular") {
            return item.popular;
          }

          if (category !== "Все категории" && category !== item.category)
            return false;

          if (term && !item.name.toLowerCase().includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        data = this.sortByName(data, sortValue);

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 500);
    });
  }
}

export default new Api();

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    // const keyword = this.queryStr.keyword
    //   ? {
    //       title: {
    //         $regex: this.queryStr.keyword,
    //         $options: "i",
    //       },
    //       author: {
    //         $regex: this.queryStr.keyword,
    //         $options: "i",
    //       },
    //     }
    //   : {};

    if (this.queryStr.keyword) {
      const keyword = {
        $or: [
          {
            title: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          },
          {
            author: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          },
        ],
      };
      this.query = this.query.find(keyword);
    }
    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.queryStr };

    const excludedFields = ["limit", "keyword", "limit", "sort", "page"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination() {
    let page = Number(this.queryStr.page) || 1;
    let limit = Number(this.queryStr.limit) || 12;
    let skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;

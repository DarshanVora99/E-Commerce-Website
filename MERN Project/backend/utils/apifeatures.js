// Performing features Like Search , Filters etc 

// query in url means anything after ?
// eg - "http://localhost:400/api/v1/products?keyword:samosa"
// query is keyword=samosa

class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
    

    search() {
        // Refer mongoDB website for understanding all this 
        // const keyword = this.queryStr.keyword ? {} : {}  // if(keyword found) {} : else {}
        // regrex is regular expression
        const keyword = this.queryStr.keyword
          ? {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",  // i means caseinsensitive  ("ABC", "abc", "ABc" .. etc)
              },
            }
          : {}; // else block
        
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;  // use for this.search()
    }



    filter() {
        const queryCopy = { ...this.queryStr };  // It will create copy since Objects are passed as referrence
        console.log(queryCopy);

        //   Removing some fields for category (To just access Category)
        const removeFields = ["keyword", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key]);

        // Printing After removing 
        console.log(queryCopy);
    


        // Filter For Price and Rating
    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
      }
    
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1

        const skip = resultPerPage * (currentPage - 1);   // skip starting ke 10 products for next page 
        // 10*(2-1)  --> Show from 11th Page 

        this.query = this.query.limit(resultPerPage).skip(skip);

        // Product.find().limit().skip()  -- MongoDB method 
    
        return this;
    }
    
}   

module.exports = ApiFeatures;
// API request sent to 500px

import request from "superagent";
import { assign } from "lodash";

const APIUtils = {

  get(endpoint, query, done) {
    if (arguments.length === 2 ) {
      done = query;
      query: {};
    }
    const url = "http://500px.com/tchebotarev"

    // Consumer key provided by 500px
    query = assign(query, {
      consumer_key: "8YfRnQkErIQyQ72CYiCOdeBUGcyJ6SyF0vjvcSob"
    });

    request.get(url)
      .query(query)
      .end((err, res) => {
        console.log("error")

        if (err ) {
          if (err.status) {
            // Normailze statusCode vs status
            err.statusCode = err.status;
          }

          return done(err)
        }
        done(null, res.body);
      });
  }

};

export default APIUtils;

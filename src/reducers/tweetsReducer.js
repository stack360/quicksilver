/**
 * Created by su on 6/7/17.
 */

export default function reducer(state={
    tweets:[],
    fetching:false,
    fetched:false,
    error:null
},action){
    return state;
    switch (action.type){
        case "FETCH_TWEETS":{

        }
        case "FETCH_TWEETS_REJECTED":{

        }
        case "FETCH_TWEETS_FULFILLED":{

        }
    }
}
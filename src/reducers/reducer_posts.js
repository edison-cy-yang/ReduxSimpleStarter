import { FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST } from '../actions';

import _ from 'lodash';

export default function(state ={}, action) {
    switch(action.type) {
        case DELETE_POST:
            //look at the state object, if it has a key of post id, drop it
            //return the new state object
            return _.omit(state, action.payload);
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            const post = action.payload.data;
            ///take all the existing post we have out of the state object and put them
            ///into this new object
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;

            return { ...state, [action.payload.data.id]: action.payload.data };
        default:
            return state;
    }
}
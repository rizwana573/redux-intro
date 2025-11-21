import { createStore } from "redux";
import { myCreateStore } from "./my-redux.js";

const initialState = {
  name: "Riz",
  post: 0,
  age: 30,
};

const INCREMENT = "post/increment";
const DECREMENT = "post/decrement";
const INCREMENT_BY = "post/incrementBy";
const DECREMENT_BY = "post/decrementBy";

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 };
    case DECREMENT:
      return { ...state, post: state.post - 1 };
    case INCREMENT_BY:
      return { ...state, post: state.post + action.payload };
    case DECREMENT_BY:
      return { ...state, post: state.post - action.payload };
    default:
      return state;
  }
}
const store = createStore(reducer, __REDUX_DEVTOOLS_EXTENSION__());
const myStore = myCreateStore(reducer);

console.log(store);
console.log(myStore);

myStore.subscribe(() => {
  console.log(myStore.getState());
});

myStore.dispatch({ type: "post/increment" });
myStore.dispatch({ type: "post/increment" });
myStore.dispatch({ type: "post/decrement" });
myStore.dispatch({ type: "post/incrementBy", payload: 15 });
myStore.dispatch({ type: "post/decrementBy", payload: 10 });

export function myCreateStore(reducer){
    let state;
    const listeners =[];
    const store={
       dispatch(action){
        state = reducer(state, action);
        listeners.forEach(listener => listener())
      },
      getState(){
        return state;
      },
      subscribe(listener){
       listeners.push(listener);
      }
    }
    return store;
}
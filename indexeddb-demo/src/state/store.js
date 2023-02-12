import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";

const initialState = {
  name: '',
  role: '',
  salary: '',
  allEmployeeData: [],
  addEmployee: false,
  updateEmployee: false,
  selectedEmployee: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      };
    case 'SET_ROLE':
      return {
        ...state,
        role: action.payload
      };
    case 'SET_SALARY':
      return {
        ...state,
        salary: action.payload
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        addEmployee: action.payload
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        updateEmployee: action.payload
      };
    case 'SET_SELECTED_EMPLOYEE':
      return {
        ...state,
        selectedEmployee: action.payload
      };
    case 'SET_ALL_EMPLOYEE_DATA':
      return {
        ...state,
        allEmployeeData: action.payload
      };
    default:
      return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware()));
console.log(store.getState());
store.subscribe(() => {
  console.log("Action Dispatched: ", store.getState());
});


export default store;


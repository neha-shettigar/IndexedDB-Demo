
// initial state of the store
const initialState = {
  name: '',
  role: '',
  salary: '',
  allEmployeeData: [],
  addEmployee: false,
  updateEmployee: false,
  selectedEmployee: {},
};

// reducer function updates the state according to the action
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'SET_NAME':
    //   return {
    //     ...state,
    //     name: action.payload,
    //   };
    // case 'SET_ROLE':
    //   return {
    //     ...state,
    //     role: action.payload,
    //   };
    // case 'SET_SALARY':
    //   return {
    //     ...state,
    //     salary: action.payload,
    //   };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        addEmployee: action.payload,
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        updateEmployee: action.payload,
      };
    case 'SET_SELECTED_EMPLOYEE':
      return {
        ...state,
        selectedEmployee: action.payload,
      };
    case 'SET_ALL_EMPLOYEE_DATA':
      return {
        ...state,
        allEmployeeData: action.payload,
      };
    default:
      return state;
  }
};

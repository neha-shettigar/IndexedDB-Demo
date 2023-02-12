export const setName = (name) => ({
  type: "SET_NAME",
  payload: name,
});

export const setRole = (role) => ({
  type: "SET_ROLE",
  payload: role,
});

export const setSalary = (salary) => ({
  type: "SET_SALARY",
  payload: salary,
});

export const addEmployee = (addEmployee) => ({
  type: "ADD_EMPLOYEE",
  payload: addEmployee,
});

export const updateEmployee = (updateEmployee) => ({
  type: "UPDATE_EMPLOYEE",
  payload: updateEmployee,
});

export const setSelectedEmployee = (selectedEmployee) => ({
  type: "SET_SELECTED_EMPLOYEE",
  payload: selectedEmployee,
});

export const setAllEmployeeData = (allEmployeeData) => ({
  type: "SET_ALL_EMPLOYEE_DATA",
  payload: allEmployeeData,
});

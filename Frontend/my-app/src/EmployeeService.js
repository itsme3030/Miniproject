import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

const getAllEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createEmployee = async (employee) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const EmployeeService = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default EmployeeService;

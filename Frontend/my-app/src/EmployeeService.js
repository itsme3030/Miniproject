import axios from 'axios';

const EMP_API_URL = 'http://localhost:8080/api/employees';

export const getAllEmployees = async () => {
  const response = await axios.get(EMP_API_URL);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(EMP_API_URL, employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${EMP_API_URL}/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${EMP_API_URL}/${id}`);
};

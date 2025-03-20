import axios from 'axios';

const DEPT_API_URL = 'http://localhost:8080/api/departments';

export const getAllDepartments = async () => {
  const response = await axios.get(DEPT_API_URL);
  return response.data;
};

export const createDepartment = async (dept) => {
  const response = await axios.post(DEPT_API_URL, dept);
  return response.data;
};

export const updateDepartment = async (id, dept) => {
  const response = await axios.put(`${DEPT_API_URL}/${id}`, dept);
  return response.data;
};

export const deleteDepartment = async (id) => {
  await axios.delete(`${DEPT_API_URL}/${id}`);
};

export const getEmployeesByDepartment = async (deptId) => {
  const response = await axios.get(`${DEPT_API_URL}/${deptId}/employees`);
  return response.data;
};

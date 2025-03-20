const DEPT_API_URL = 'http://localhost:8080/api/departments';

export const getAllDepartments = async () => {
  const response = await fetch(DEPT_API_URL);
  if (!response.ok) throw new Error('Error fetching departments');
  return await response.json();
};

export const createDepartment = async (dept) => {
  const response = await fetch(DEPT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dept),
  });
  if (!response.ok) throw new Error('Error creating department');
  return await response.json();
};

export const updateDepartment = async (id, dept) => {
  const response = await fetch(`${DEPT_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dept),
  });
  if (!response.ok) throw new Error('Error updating department');
  return await response.json();
};

export const deleteDepartment = async (id) => {
  const response = await fetch(`${DEPT_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting department');
};

export const getEmployeesByDepartment = async (deptId) => {
  const response = await fetch(`${DEPT_API_URL}/${deptId}/employees`);
  if (!response.ok) throw new Error('Error fetching employees by department');
  return await response.json();
};

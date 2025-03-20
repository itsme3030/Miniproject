const EMP_API_URL = 'http://localhost:8080/api/employees';

export const getAllEmployees = async () => {
  const response = await fetch(EMP_API_URL);
  if (!response.ok) throw new Error('Error fetching employees');
  return await response.json();
};

export const createEmployee = async (employee) => {
  const response = await fetch(EMP_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error('Error creating employee');
  return await response.json();
};

export const updateEmployee = async (id, employee) => {
  const response = await fetch(`${EMP_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error('Error updating employee');
  return await response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${EMP_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting employee');
};

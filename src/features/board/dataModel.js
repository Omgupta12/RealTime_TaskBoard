export const createTask = (title, description = '') => {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const createColumn = (title) => {
  return {
    id: crypto.randomUUID(),
    title,
    taskIds: [],
  };
};

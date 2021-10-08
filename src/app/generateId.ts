let counter = 0;

const generateId = (prefix = 'id'): string => {
  counter += 1;

  return `${prefix}-${counter}`;
};

export {
  generateId
};

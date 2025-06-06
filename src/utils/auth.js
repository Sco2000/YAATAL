export const getCurrentUser = () => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

// Save a user to localStorage
export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};
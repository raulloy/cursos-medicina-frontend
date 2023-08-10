export const proxy = 'https://cursos-medicina.onrender.com/';

export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

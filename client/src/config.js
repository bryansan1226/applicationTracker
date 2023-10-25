const API_URL =
  process.env.NODE_ENV === "production"
    ? `https://application-tracker-bryansan26.herokuapp.com`
    : `http://localhost:3001`;

export default API_URL;

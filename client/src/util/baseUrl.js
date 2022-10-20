const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://application-tracker-bryansan26.herokuapp.com/"
    : "http://localhost:8080";
export default baseUrl;

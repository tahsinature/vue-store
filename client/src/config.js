const isDevelopment = process.env.NODE_ENV === "development"
const apiURL = isDevelopment ? "http://localhost:3000/api" : "https://vue-store.tahsin.us/api"

export default {
  isDevelopment,
  apiURL,
}

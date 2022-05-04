const isDevelopment = process.env.NODE_ENV === "development"

export default {
  isDevelopment,
  apiURL: isDevelopment ? "http://localhost:3000/api" : "https://vue-store.tahsin.us/api",
}

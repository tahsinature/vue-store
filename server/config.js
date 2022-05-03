require("dotenv").config()
const path = require("path")

const config = {
  app: {
    isTest: process.env.NODE_ENV === "test",
    docs: {
      rest: path.join(process.cwd(), "docs", "rest.json"),
    },
  },
  dbURI: process.env.DB_URI || "mongodb://localhost/e-market",
  appPort: process.env.PORT || 3000,
  locations: {
    asia: "asia",
    africa: "africa",
    europe: "europe",
    australia: "australia",
    antartica: "antartica",
    "south-america": "south-america",
    "north-america": "north-america",
  },
  categories: {
    mobile: "mobile",
    electronic: "electronic",
    vehicle: "vehicle",
    property: "property",
    job: "job",
    service: "service",
    "home-living": "home-living",
    "fashion-health-beauty": "fashion-health-beauty",
    "hobby-sport-kid": "hobby-sport-kid",
    business: "business",
    education: "education",
    pets: "pets",
    food: "food",
  },
  genders: {
    Male: "Male",
    Female: "Female",
  },
  defaultPassword: "12345678",
  random: {
    imageURL: "https://picsum.photos/200/300",
  },
  defaultProductsPerPage: 15,
}

module.exports = config

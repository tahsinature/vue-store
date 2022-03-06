require("dotenv").config();

const config = {
  dbURI: process.env.DB_URI || "mongodb://localhost/e-market",
  appPort: process.env.PORT || 3000,
  locations: [
    "asia",
    "africa",
    "europe",
    "australia",
    "antartica",
    "south-america",
    "north-america",
  ],
  categories: [
    "mobile",
    "electronic",
    "vehicle",
    "property",
    "job",
    "service",
    "home-living",
    "fashion-health-beauty",
    "hobby-sport-kid",
    "business",
    "education",
    "pets",
    "food",
  ],
};

module.exports = config;

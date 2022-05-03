const config = require("../config")
const db = require("../db")
const logger = require("../logger")
const ProductSeeder = require("./files/product")
const UserSeeder = require("./files/user")
const faker = require("faker")

class Seeder {
  constructor() {
    this.files = {
      user: new UserSeeder(),
      product: new ProductSeeder(),
    }
  }

  async seed() {
    await db.connect()
    await db.clearModels()

    /**
     * Seed Users
     */
    const otherUsers = await this.files.user.createMany(10)
    logger.db.info(`Other Users Created: ${otherUsers.length}`)

    const mainUser = await this.files.user.createOne()
    logger.db.info(`User created: ${mainUser.userName}, password: ${config.defaultPassword}`)

    await this.files.user.addUserContact(mainUser, otherUsers)

    /**
     * Seed Products
     */
    const allProducts = []
    for (const otherUser of otherUsers) {
      const products = await this.files.product.createMany(otherUser, faker.random.number({ min: 1, max: 3 }))
      allProducts.push(...products)
    }
    logger.db.info(`seeded ${allProducts.length} products for other users`)
    const myProducts = await this.files.product.createMany(mainUser, faker.random.number({ min: 1, max: 3 }))
    logger.db.info(`seeded ${myProducts.length} products for main user`)

    await db.disconnect()
  }
}

const seeder = new Seeder()
module.exports = seeder
module.exports.seed = seeder.seed

const faker = require("faker")
const config = require("../../config")
const BaseSeeder = require("../baseSeeder")

class ProductSeeder extends BaseSeeder {
  async createOne(user, likers = []) {
    await this.models.Product.create({
      title: this.faker.commerce.productName().substring(0, 20),
      price: this.faker.commerce.price(),
      description: this.faker.lorem.paragraph(),
      images: [
        {
          url: config.random.imageURL,
          public_id: this.faker.random.uuid(),
        },
      ],

      likes: likers.length,
      likers,
      location: faker.random.arrayElement(Object.values(config.locations)),
      author: user,
      category: faker.random.arrayElement(Object.values(config.categories)),
      condition: "Used",
      isSold: false,
      createdAt: faker.date.recent(1),
    })
  }

  async createMany(user, num = 5) {
    const result = []

    for (const _i of Array(num)) {
      const product = await this.createOne(user, [])
      result.push(product)
    }

    return result
  }
}

module.exports = ProductSeeder

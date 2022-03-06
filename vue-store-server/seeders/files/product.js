const BaseSeeder = require("../baseSeeder");

class ProductSeeder extends BaseSeeder {
  async createOne(user) {
    await this.models.Product.create({
      title: this.faker.commerce.productName().substring(0, 20),
      price: this.faker.commerce.price(),
      description: this.faker.lorem.paragraph(),
      images: [
        {
          url: this.faker.image.imageUrl(),
          public_id: this.faker.random.uuid(),
        },
      ],

      likes: 0,
      // likers: ['someone'],
      location: this.config.locations[0],
      author: user,
      category: this.config.categories[0],
      condition: "Used",
      isSold: false,
    });
  }

  async createMany(user, num = 5) {
    const result = [];

    for (const _i of Array(num)) {
      const product = await this.createOne(user);
      result.push(product);
    }

    return result;
  }
}

module.exports = ProductSeeder;

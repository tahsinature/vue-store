const db = require("../db");
const ProductSeeder = require("./files/product");
const UserSeeder = require("./files/user");

class Seeder {
  constructor() {
    this.files = {
      user: new UserSeeder(),
      product: new ProductSeeder(),
    };
  }

  async seed() {
    await db.connect();
    await db.dropDB();

    const user = await this.files.user.createOne();
    const products = await this.files.product.createMany(user, 10);
    console.log(products.length);

    console.log("seed done");
    //  this.files.product.createOne()

    await db.disconnect();
  }
}

const seeder = new Seeder();
module.exports = seeder;
module.exports.seed = seeder.seed;

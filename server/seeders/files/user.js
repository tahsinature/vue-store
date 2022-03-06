const BaseSeeder = require("../baseSeeder");

class ProductSeeder extends BaseSeeder {
  async createOne() {
    const user = await this.models.User.create({
      fullName: this.faker.name.findName(),
      userName: this.faker.internet.userName(),
      email: this.faker.internet.email().toLowerCase(),
      password: await this.utility.genHashForPass("12345678"),
      contactNo: this.faker.phone.phoneNumber(),
      profilePhoto: {
        url: this.faker.image.imageUrl(),
        public_id: this.faker.random.uuid(),
      },
      bio: this.faker.lorem.paragraph(1),
      location: "Asia",
      address: this.faker.address.streetAddress(),
      gender: "Male",
      cart: [],
      contacts: [],
      chats: [],
      isOnline: true,
      notifications: [],
    });

    return user;
  }
}

module.exports = ProductSeeder;

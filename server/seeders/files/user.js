const config = require("../../config")
const BaseSeeder = require("../baseSeeder")

class ProductSeeder extends BaseSeeder {
  async createOne({ password, email, location, userName } = {}) {
    const user = await this.models.User.create({
      fullName: this.faker.name.findName(),
      userName: userName || this.faker.internet.userName().toLowerCase(),
      email: email || this.faker.internet.email().toLowerCase(),
      password: await this.utility.genHashForPass(password || config.defaultPassword),
      contactNo: this.faker.phone.phoneNumber(),
      profilePhoto: {
        url: config.random.imageURL,
        public_id: this.faker.random.uuid(),
      },
      bio: this.faker.lorem.paragraph(1),
      location: location || config.locations.asia,
      address: this.faker.address.streetAddress(),
      gender: config.genders.Male,
      cart: [],
      contacts: [],
      chats: [],
      isOnline: true,
      notifications: [],
    })

    return user
  }

  async createMany(count) {
    const all = []

    for (const _ of Array(count)) {
      const single = await this.createOne()
      all.push(single)
    }

    return all
  }

  async addUserContact(mainUser, otherUsers) {
    for (const otherUser of otherUsers) {
      await mainUser.addContact(otherUser)
    }
  }
}

module.exports = ProductSeeder

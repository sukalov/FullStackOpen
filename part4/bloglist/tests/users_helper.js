const User = require('../models/user')
const bcrypt = require('bcrypt')

const defaultUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: '12345678',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9',
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc',
    ],
    _id: '647f7cb615e8341663c8f495',
  },
  {
    username: 'sukalov',
    name: 'Matvey Sokolovsky',
    password: '00000000',
    blogs: [
      '6483bf6338b0f7827bd755e4',
    ],
    _id: '64838f9d023f8a04a5e42b5a',
  },
]

const resetUsersDB = async () => {
  await User.deleteMany({})
  const users = await Promise.all(defaultUsers.map(async ({
    username, password, blogs, name, _id,
  }) => {
    const passwordHash = await bcrypt.hash(password, 10)
    return {
      username, name, passwordHash, blogs, _id,
    }
  }))

  const userObjects = users.map((user) => new User(user))
  const allPromises = userObjects.map(async (userObject) => userObject.save())
  await Promise.all(allPromises)
}

const stateOfUsersDB = async () => (await User.find({})).map((u) => u.toJSON())

module.exports = {
  defaultUsers, resetUsersDB, stateOfUsersDB,
}

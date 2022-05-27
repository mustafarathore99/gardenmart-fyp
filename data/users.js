import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    address:"Iqbal Town ",
city:"Lahore",
postalCode:"004",
phone:"03407816294",
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    address:"Iqbal Town ",
city:"Lahore",
postalCode:"004",
phone:"03407816294"
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    address:"Iqbal Town ",
city:"Lahore",
postalCode:"004",
phone:"03407816294"
  },
]

export default users

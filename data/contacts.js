const contacts = [
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Carmack",
    "street": "10 Keen Street",
    "city": "London",
    "type": "work",
    "email": "test@test.com",
    "linkedin": "https://www.linkedin.com/school/boolean-uk/",
    "twitter": "https://twitter.com/booleanuk"
  },
  {
    "id": 2,
    "firstName": "Grace",
    "lastName": "Hopper",
    "street": "32 Deebug Road",
    "city": "London",
    "type": "personal",
    "email": "test@test.com",
    "linkedin": "https://www.linkedin.com/school/boolean-uk/",
    "twitter": "https://twitter.com/booleanuk"
  }
]

let contactId = 0

const getNewContactId = () => ++contactId

const addContact = (
  firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedinURL,
    twitterHandle
) => contacts.push(new Contact(
  firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedinURL,
    twitterHandle
))

class Contact {
  constructor(
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedinURL,
    twitterHandle
  ) {
    this.id = getNewContactId()
    this.firstName = firstName 
    this.lastName = lastName 
    this.street = street 
    this.city = city 
    this.type = type 
    this.email = email 
    this.linkedinURL = linkedinURL
    this.twitterHandle = `https://twitter.com/${twitterHandle}` 
  }
}

module.exports = { 
  contacts,
  Contact
}

const contacts = [
  {
    id: 1,
    firstName: "John",
    lastName: "Carmack",
    street: "10 Keen Street",
    city: "London",
    type: "work",
    email: "test@test.com",
    linkedin: "https://www.linkedin.com/school/boolean-uk/",
    twitter: "https://twitter.com/booleanuk",
    meetings: [
      {
        name: "a test meeting about life",
        contactId: 1,
        id: 1,
      },
      {
        name: "a new meeting for the hopeful",
        contactId: 1,
        id: 3,
      },
    ],
  },
  {
    id: 2,
    firstName: "Grace",
    lastName: "Hopper",
    street: "32 Deebug Road",
    city: "London",
    type: "personal",
    email: "test@test.com",
    linkedin: "https://www.linkedin.com/school/boolean-uk/",
    twitter: "https://twitter.com/booleanuk",
    meetings: [
      {
        name: "another test meeting for wondering about existence",
        contactId: 2,
        id: 2,
      },
    ],
  },
];

module.exports = contacts;

const { app, state } = require('../server.js')
const supertest = require('supertest')
const createTestFormData = require('./fixtures/createTestFormData.js')
const updateTestFormData = require('./fixtures/updateTestFormData.js')
const contacts = require('../data/contacts.js')
const meetings = require('../data/meetings.js')

describe('Address Book API', () => {
  beforeEach(() => {
    state.contacts = [...contacts]
    state.meetings = [...meetings]
  })

  describe('GET /contacts', () => {
    it('returns default contacts', async () => {
      const response = await supertest(app).get('/contacts')

      expect(response.status).toEqual(200)
      expect(response.body.contacts).not.toEqual(undefined)
      expect(response.body.contacts.length).toEqual(2)

      const [contact1, contact2] = response.body.contacts
      expect(contact1.firstName).toEqual("John")
      expect(contact1.lastName).toEqual("Carmack")
      expect(contact2.firstName).toEqual("Grace")
      expect(contact2.lastName).toEqual("Hopper")
    })
  })

  describe('GET /contacts/:id', () => {
    it('returns contact, id 2', async () => {
      const response = await supertest(app).get('/contacts/2')

      expect(response.status).toEqual(200)
      expect(response.body.contact).not.toEqual(undefined)

      const contact = response.body.contact
      expect(contact.id).toEqual(2)
      expect(contact.firstName).toEqual("Grace")
      expect(contact.lastName).toEqual("Hopper")
    })
  })

  describe('POST /contacts', () => {
    it('returns created contact', async () => {
      const response = await supertest(app)
        .post('/contacts')
        .send(createTestFormData)

      expect(response.status).toEqual(200)
      expect(response.body.contact).not.toEqual(undefined)

      const contact = response.body.contact
      expect(contact.id).toEqual(3)
      expect(contact.firstName).toEqual(createTestFormData.firstName)
      expect(contact.lastName).toEqual(createTestFormData.lastName)
    })

    it('adds contact to data store', async () => {
      await supertest(app)
        .post('/contacts')
        .send(createTestFormData)

      const response = await supertest(app).get('/contacts')

      expect(response.status).toEqual(200)
      expect(response.body.contacts).not.toEqual(undefined)
      expect(response.body.contacts.length).toEqual(3)

      const [contact1, contact2, contact3] = response.body.contacts
      expect(contact3.firstName).toEqual(createTestFormData.firstName)
      expect(contact3.lastName).toEqual(createTestFormData.lastName)
    })
  })

  describe('PUT /contacts', () => {
    const subject = contacts[1]
    const updatedContact = {
      ...updateTestFormData,
      id: subject.id
    }
    it('returns updated contact', async () => {
      const response = await supertest(app)
        .put(`/contacts/${subject.id}`)
        .send(updateTestFormData)

      expect(response.status).toEqual(200)
      expect(response.body.contact).not.toEqual(undefined)

      const contact = response.body.contact
      expect(contact).toMatchObject(updatedContact)
    })

    it('updated contact is in data store', async () => {
      await supertest(app)
        .put(`/contacts/${subject.id}`)
        .send(updateTestFormData)

      const response = await supertest(app).get('/contacts')

      expect(response.status).toEqual(200)
      expect(response.body.contacts).not.toEqual(undefined)
      expect(response.body.contacts.length).toEqual(2)

      const [contact1, contact2] = response.body.contacts
      expect(contact2.firstName).toEqual(updatedContact.firstName)
      expect(contact2.lastName).toEqual(updatedContact.lastName)
    })
  })

  describe('DELETE /contacts/1', () => {
    const subject = contacts[0]

    it('returns deleted contact', async () => {
      const response = await supertest(app)
        .delete(`/contacts/${subject.id}`)

      expect(response.status).toEqual(200)
      expect(response.body.contact).not.toEqual(undefined)

      const contact = response.body.contact
      expect(contact).toMatchObject(subject)
    })

    it('removes contact from data store', async () => {
      await supertest(app)
        .delete(`/contacts/${subject.id}`)

      const response = await supertest(app).get('/contacts')

      expect(response.status).toEqual(200)
      expect(response.body.contacts).not.toEqual(undefined)
      expect(response.body.contacts.length).toEqual(1)
      expect(response.body.contacts).not.toContain(subject)
    })
  })
})

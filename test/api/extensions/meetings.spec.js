const supertest = require('supertest')

describe('Address Book API', () => {
  let app, createTestFormData, updateTestFormData

  beforeEach(() => {
    app = require('../../../src/server.js')
    createTestFormData = require('../../fixtures/meetings/createTestFormData.js')
  })

  describe('GET /meetings', () => {
    let expectedMeetings
    beforeEach(() => {
      expectedMeetings = [
        {
          "name": "a test meeting about life",
          "contactId": "1",
          "id": 1
        },
        {
          "name": "another test meeting for wondering about existence",
          "contactId": "2",
          "id": 2
        },
        {
          "name": "a new meeting for the hopeful",
          "contactId": "1",
          "id": 3
        }
      ]
    })
    it('returns default meetings', async () => {
      const response = await supertest(app).get('/meetings')

      expect(response.status).toEqual(200)
      expect(response.body.meetings).not.toEqual(undefined)
      expect(response.body.meetings.length).toEqual(3)
      expect(response.body.meetings).toEqual(expectedMeetings)
    })
  })

  describe('GET /contacts/:id/meetings', () => {
    let expectedMeetings
    beforeEach(() => {
      expectedMeetings = [
        {
          "name": "a test meeting about life",
          "contactId": "1",
          "id": 1
        },
        {
          "name": "another test meeting for wondering about existence",
          "contactId": "2",
          "id": 2
        },
        {
          "name": "a new meeting for the hopeful",
          "contactId": "1",
          "id": 3
        }
      ]
    })
    it('returns default meetings', async () => {
      const response = await supertest(app).get('/meetings')

      expect(response.status).toEqual(200)
      expect(response.body.meetings).not.toEqual(undefined)
      expect(response.body.meetings.length).toEqual(3)
      expect(response.body.meetings).toEqual(expectedMeetings)
    })
  })

  describe('POST /contacts/:id/meetings', () => {
    it('returns created meeting for contact of id 1', async () => {
      const response = await supertest(app)
        .post('/contacts/1/meetings')
        .send(createTestFormData)

      expect(response.status).toEqual(200)
      expect(response.body.meeting).not.toEqual(undefined)

      const meeting = response.body.meeting
      expect(meeting.id).toEqual(4)
      expect(meeting.name).toEqual(createTestFormData.name)
      expect(meeting.contactId).toEqual(1)
    })

    it('adds meeting to data store for contact of id 1', async () => {
      const responseBefore = await supertest(app).get('/meetings')
      await supertest(app)
        .post('/contacts/1/meetings')
        .send(createTestFormData)
      const responseAfter = await supertest(app).get('/meetings')

      expect(responseBefore.body.meetings).not.toEqual(undefined)
      expect(responseAfter.body.meetings).not.toEqual(undefined)
      expect(responseBefore.body.meetings.length).toEqual(3)
      expect(responseAfter.body.meetings.length).toEqual(4)
    })
  })
  describe('PUT /contacts/:id/meetings', () => {
    it('returns created meeting for contact of id 1', async () => {
      const response = await supertest(app)
        .post('/contacts/1/meetings')
        .send(createTestFormData)

      expect(response.status).toEqual(200)
      expect(response.body.meeting).not.toEqual(undefined)

      const meeting = response.body.meeting
      expect(meeting.id).toEqual(4)
      expect(meeting.name).toEqual(createTestFormData.name)
      expect(meeting.contactId).toEqual(1)
    })

    it('adds meeting to data store for contact of id 1', async () => {
      const responseBefore = await supertest(app).get('/meetings')
      await supertest(app)
        .post('/contacts/1/meetings')
        .send(createTestFormData)
      const responseAfter = await supertest(app).get('/meetings')

      expect(responseBefore.body.meetings).not.toEqual(undefined)
      expect(responseAfter.body.meetings).not.toEqual(undefined)
      expect(responseBefore.body.meetings.length).toEqual(3)
      expect(responseAfter.body.meetings.length).toEqual(4)
    })
  })
})

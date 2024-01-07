const meetings = [
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

let meetingId = 0

const initMeetingId = () => {
  meetings.forEach((meeting) => {
    if (meeting.id > meetingId) {
      meetingId = meeting.id
    }
  })
}

initMeetingId()

const getNewMeetingId = () => ++meetingId
const getMeetingById = (id) => meetings.find((meeting) => meeting.id === id)
const getMeetingsForContact = (contactIdAsNum) => meetings.filter((meeting) => meeting.contactId === String(contactIdAsNum))
const deleteMeetingById = (id) => {
  const index = meetings.findIndex((meeting) => meeting.id === id)
  const deletedMeeting = meetings[index]
  meetings.splice(index, 1)
  return deletedMeeting
}
const deleteMeetingsForContact = (contactIdAsNum) => {
  const meetings = getMeetingsForContact(contactIdAsNum)
  meetings.forEach((meeting) => deleteMeetingById(meeting.id))
  return meetings
}

class Meeting {
  constructor(name, contactId) {
    this.id = getNewMeetingId()
    this.name = name
    this.contactId = String(contactId)
  } 
}

const addMeeting = (name, contactId) => {
  meetings.push(new Meeting(name, contactId))
}

module.exports = {
  meetings,
  addMeeting,
  getMeetingById,
  getMeetingsForContact,
  deleteMeetingById,
  deleteMeetingsForContact
}

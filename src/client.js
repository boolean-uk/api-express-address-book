const {contacts} = require('../data/contacts.js')
const meetings = require('../data/meetings.js')

function foundContactById (req, res) {
    const contactId = Number(req.params.id)
    const foundContact = contacts.find((contact) => contact.id === contactId)

    if(!foundContact) {
        res.status(404).json({error: `No contact with ID: ${contactId}`})
    }
    return foundContact
}

function foundMeetingById(req, res) {
    const meetingId = Number(req.params.id)
    const foundMeeting = meetings.find((meeting) => meeting.id === meetingId)

    if(!foundMeeting) {
        res.status(404).json({error: `No meeting with ID: ${meetingId}`})
    }
    return foundMeeting
}

module.exports = {foundContactById, foundMeetingById}
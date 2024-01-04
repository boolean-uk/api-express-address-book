const findMeeting = (req, res, data) => {
    const meetingId = Number(req.params.id)
    const foundMeeting = data.find(meeting => meeting.id === meetingId)
    if (!foundMeeting) return res.status(404).json(`Meeting with id ${meetingId} does not exist`)
    return foundMeeting
}

const formatMeeting = (meeting) => {
    const response = {
        "meeting": meeting
    }
    return response
}

const removeMeeting = (data, meeting) => {
    const meetingIndex = data.indexOf(meeting)
    data.splice(meetingIndex, 1)
}

const removeContactMeetings = (data, contact) => {
    data.map(meeting => {
        if (Number(meeting.contactId) === contact.id) {
            removeMeeting(data, meeting)
        }
    })
}

const updateMeeting = (req, meeting) => {
    const { name } = req.body
    meeting.name = name
    return meeting
}

const getContactMeetings = (contact, data) => {
    const associatedMeetings = []
    data.map(meeting => {
        if (Number(meeting.contactId) === contact.id) {
            associatedMeetings.push(meeting)
        }
    })
    const contactMeetings = {
        "meetings": associatedMeetings
    }
    return contactMeetings
}

const createMeeting = (req, contact, currentMeetingId, data) => {
    const { name } = req.body
    const newMeeting = {
        name: name,
        contactId: contact.id,
        id: ++currentMeetingId
    }
    data.push(newMeeting)
    return newMeeting
}

module.exports = { findMeeting, formatMeeting, removeMeeting, removeContactMeetings, updateMeeting, getContactMeetings, createMeeting }
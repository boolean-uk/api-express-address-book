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

module.exports = { findMeeting, formatMeeting }
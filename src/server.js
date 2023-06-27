const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

const contacts = {
    contacts: [
        {
            id: 0,
            firstName: "Marc",
            lastName: "Alzapiedi",
            street: "Strada Albareto 397",
            city: "Modena",
            type: "Personal",
            email: "marcalzapiedi@gmail.com",
            linkedin: "https://www.linkedin.com/mynetwork/",
            twitter: "https://www.don'thavetwitter.com",
            meetings: [
                {
                    id: 0,
                    contactId: 0,
                    name: "name"
                }
            ]
        }
    ]
}

app.get('/contacts', (req, res) => {
    
    return res.send(contacts)
})

app.post('/contacts', (req, res) => {
    console.log(req.body)
    const contact = req.body
    contacts.contacts.push(contact)
    return res.status(201).send(contact)
})

app.get('/contacts/:id', (req, res) => {
    console.log(req.params.id)
    const arr = contacts.contacts.filter((obj) => {
        console.log(typeof obj.id)
        console.log(typeof req.params.id)
        return obj.id === req.params.id / '1'
    })
    

    

    if (arr[0] === undefined) {
        return res.status(404).send(`No such id as: ${req.params.id}`)
    }
    return res.send(arr[0])

})

app.delete('/contacts/:id', (req, res) => {
    const arr = contacts.contacts.filter((obj) => {
        
        return obj.id === req.params.id / '1'
    })
    contacts.contacts.splice(contacts.contacts.indexOf(arr[0]), 1)
    if (arr[0] === undefined) {
        return res.status(404).send(`No such id as: ${req.params.id}`)
    }
    return res.send(contacts)
})

app.put('/contacts/:id', (req, res) => {
    console.log(req.body)
    const body = req.body
    contacts.contacts.firstName = body.firstName
    contacts.contacts.lastName = body.lastName
    contacts.contacts.street = body.street
    contacts.contacts.city = body.street
    contacts.contacts.type = body.type
    contacts.contacts.email = body.email
    contacts.contacts.linkedin = body.linkedin
    contacts.contacts.twitter = body.twitter

    const arr = contacts.contacts.filter((obj) => {
        
        return obj.id === req.params.id / '1'
    })
    if (arr[0] === undefined) {
        return res.status(404).send(`No such id as: ${req.params.id}`)
    }

    return res.send(contacts)


})



module.exports = app

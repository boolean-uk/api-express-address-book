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
        id: 1,
        firstName: "John",
        lastName: "Carmack",
        street: "34 Crescent place",
        city: "Hartford",
        type: "Personal",
        email: "john@yahoo.com",
        linkedin: "https://boolean-uk.github.io/api-express-address-book/#tag/contacts/paths/~1contacts/get",
        twitter: "https://boolean-uk.github.io/api-express-address-book/#tag/contacts/paths/~1contacts/get",
        meetings: [
            {
                id: 1,
                contactId: 1,
                name: "string"
            }
        ]
      },
      {
        id: 2,
        firstName: "Grace",
        lastName: "Hopper",
        street: "55 Dorothy Drive",
        city: "Monroe",
        type: "Personal",
        email: "grace@yahoo.com",
        linkedin: "https://boolean-uk.github.io/api-express-address-book/#tag/contacts/paths/~1contacts/get",
        twitter: "https://boolean-uk.github.io/api-express-address-book/#tag/contacts/paths/~1contacts/get",
        meetings: [
            {
                id: 2,
                contactId: 2,
                name: "string"
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
    let contact = req.body
    contact = {id: contacts.contacts.length + 1, ...contact}

    contacts.contacts.push(contact)
    return res.status(201).send({contact: contact})
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
    return res.send({contact: arr[0]})

})

app.delete('/contacts/:id', (req, res) => {
    const arr = contacts.contacts.filter((obj) => {
        
        return obj.id === req.params.id / '1'
    })
    const deleted = contacts.contacts.splice(contacts.contacts.indexOf(arr[0]), 1)
    console.log(arr)
    if (arr[0] === undefined) {
        return res.status(404).send(`No such id as: ${req.params.id}`)
    }
    return res.send({contact: deleted[0]})
})

app.put('/contacts/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    const contactReplace = contacts.contacts.find((item) => item.id === Number(id))
    const contactAdd = {id: Number(id), ...body}
    contacts.contacts.splice(contacts.contacts.indexOf(contactReplace), 1, contactAdd)
    console.log(contactAdd)
    return res.send({contact: contactAdd})


  


})



module.exports = app

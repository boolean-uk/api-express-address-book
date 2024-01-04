## Learning Objectives

- Explain how to set up and run an Express application
- Build a simple Express API and send a HTTP request to an available endpoint using a HTTP client
- Explain that JSON is a widely-used language-agnostic format for encoding data as attribute value pairs
- Diagram the request and response cycle for an Express API.
- Use console.log() and read the result in the server logs

# Exercise

Implement the API for this exercise using an API client like [Insomnia](https://insomnia.rest/).

Use the [API Spec](https://boolean-uk.github.io/api-express-address-book/) as your source of requirements for each endpoint you need to build.

Before you begin, the API is going to use global variables to hold data - which will persist while the application 
is running, but won't persist in between application restarts. These global variables are located in the `/data` 
directory.

### Set up
1. Fork and clone this repository
2. Create an express application following the same steps as per the [previous exercise](https://github.com/boolean-uk/api-express-counter/)
3. Implement the API, starting with the `contacts` endpoint, following this workflow for **each** endpoint:
    1. Diagram the endpoint lifecycle in a sequence diagram, using the image below these steps as a starting point
    2. Implement the endpoint
    3. Test the endpoint using any method you like; Insomnia, curl, unit tests etc.
4. The global variables that you should use as your data stores are found in the `/data` directory.
   1. Core criteria uses the variable exported from `/data/contacts.js`
   2. Extension criteria uses the variable exported from `/data/meetings.js`
   3. The default/initial values stored in these variables must not be modified as the tests are dependent on these
   4. You will need to work out a way to handle keeping track of the IDs for new resources that are created

![](./assets/API%20Address%20Book.png)

# Extension

Implement GET, POST, PUT and DELETE endpoints for `meetings` following the same workflow as above

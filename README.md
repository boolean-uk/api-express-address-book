## Learning Objectives

- Explain how to set up and run an Express application
- Build a simple Express API and send a HTTP request to an available endpoint using a HTTP client
- Explain that JSON is a widely-used language-agnostic format for encoding data as attribute value pairs
- Diagram the request and response cycle for an Express API.
- Use console.log() and read the result in the server logs

## Express
Express is a library that makes it easier for us to write an API server using node.js. In this workshop, you will learn how to set up express and write a simple API with multiple routes.

## Express Setup
To set up a new express application, in an empty folder follow these steps.

1. Initialize npm. You can accept all the defaults.
```
npm init
```

2. Install the [express](https://expressjs.com/)  library
```
npm install express
```

3. Install [nodemon](https://www.npmjs.com/package/nodemon). nodemon is a utility that will automatically restart our express server any time we change code.
```
npm install --save-dev nodemon
```

4. Install the [morgan](https://expressjs.com/en/resources/middleware/morgan.html) middleware. Express middleware allows us to extend express with additional functionality. Morgan is express middleware we can use to have our server automatically log all requests. This helps gives us visibility of what our server is doing.
```
npm install morgan
```

5. Install the [cors](https://expressjs.com/en/resources/middleware/cors.html) middleware. This allows us to make HTTP requests to our API using fetch from the browser.
```
npm install cors
```

6. Create our `index.js` file. This is our *entrypoint* - the source file that will start running our server.

```javascript
//Include the express library
const express = require("express")
//Include the morgan middleware
const morgan = require("morgan")
//Include the cors middleware
const cors = require("cors")

//Create a new express application
const app = express()

//Tell express we want to use the morgan library
app.use(morgan("dev"))
//Tell express we want to use the cors library
app.use(cors())

//Start up our server
const port = 3030
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}/`)
})

```

7. Update your `package.json` file and replace the `"scripts"` section with the following:

```json
"scripts": {
   "start" : "nodemon index.js"
},
```

8. Finally, start up our server!
```
npm start
```

Our servers is now running and *listening* for HTTP requests.

## Adding Routes
If you try to access your server using your browser or any other tool, you will get the response:

```
Cannot GET /
```

This is because we've not yet told express what *routes* our API should handle.

Express provides us with the ability to easily set up [routes](https://expressjs.com/en/guide/routing.html) in our API. The following will return "Hello!" to any HTTP request set to the default "/" route:

```javascript
app.get("/", (req, res) => {
 console.log("got request!")
 res.send("Hello!")
})
```

Note: this needs to be added before we start the server.

The code above:
1. Tells express we want to define a handler for any GET request (`app.get`) to the path `/`
2. Provides a callback function to express using the arrow function syntax. Here we are telling express "When you receive a HTTP request on this path, I want you to call this function".
3. The callback function accepts 2 arguments, `req` and `res`. These are objects provided to use by express. `req` contains information about the HTTP [request](https://expressjs.com/en/4x/api.html#req) from the client. `res` allows us to send back different [responses](https://expressjs.com/en/4x/api.html#res) to the client.
4. Our callback uses the response object to send back some text to the client.

We can also send back `json` using the `res.json()` method that express gives us. Change your first handler to use `res.json`:

```javascript
app.get("/", (req, res) => {
 console.log("got request!")
 res.json({msg: 'hello!'})
})
```

# Exercise

Implement the API for the Address Book Challenge using the [client app](https://github.com/boolean-uk/api-sample-client).

Use the [API Spec](https://boolean-uk.github.io/api-express-address-book/) as your source of requirements for each endpoint you need to build.

Before you begin, the API is going to use global variables to hold data - which will persist while the application is running, but won't persist in between application restarts.

Let's add a file to store our contacts and then export them for our express application to use (starting in `index.js` probably)
Find expected response data in https://github.com/boolean-uk/api-sample-client/tree/main/data

```js
const contacts = require('./data/contacts')
```

### Set up
1. Fork and clone this repository
2. Fork and clone the client app repository
3. Run the client app from your terminal.

4. Create an express application following the steps above.
5. Implement the API for the client app, starting with the `contacts` endpoint, following this workflow for **each** endpoint:
    1. Diagram the endpoint lifecycle in a sequence diagram, using the image below these steps as a starting point
    2. Implement the endpoint
    3. Test the endpoint using any method you like; the client app with console logs, Insomnia, curl etc.

![](./assets/API%20Address%20Book.png)

# Extension

Implement GET, POST, PUT and DELETE endpoints for `meetings` following the same workflow as above

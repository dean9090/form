const express = require('express')
const mustacheExpress = require('mustache-express')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views')
app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  response.render('index')
})

app.post('/signup', (request, response) => {
  let name = request.body.name
  let email = request.body.email
  let yob = request.body.year
  let job = request.body.jobs

  let password = request.body.password

  let html = `name = ${name} email = ${email} Year of Birth = ${yob} jobs = ${job}  password = ${password}`
  response.send(html)
})

app.listen(3000, () => {
  console.log('Hooray our app is listening')
})

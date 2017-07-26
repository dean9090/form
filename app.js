const express = require('express')
const mustacheExpress = require('mustache-express')
const expressValidator = require('express-validator')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.set('views', './views')
app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  response.render('index')
})

app.post('/signup', (request, response) => {
  request.checkBody('name', 'You must enter a username!').notEmpty().isLength(0, 100)
  request.checkBody('email', 'You must enter your email!').notEmpty().isLength(0, 100).isEmail()
  request.checkBody('year', 'Please enter your year of birth!').isInt({ min: 1900, max: 2017 })
  request.checkBody('job', 'Please select your option').notEmpty()
  request.checkBody('password', 'Please enter your password!').notEmpty().isLength(8, 1000)

  var errors = request.validationErrors()
  if (errors) {
    var html = errors
    response.send(html)
  } else {
    let name = request.body.name
    console.log(name)
    let email = request.body.email
    console.log(email)
    let year = request.body.year
    console.log(year)
    var job = request.body.job
    console.log(job)

    let password = request.body.password
    console.log(password)

    let html = `<p> Your name is: ${name}</p>
                <p> Your email is: ${email}</p>
                <p> Your year of birth is between 1900 and 2017: ${year}</p>
                <p> Your job selection is: ${job}</p>
                <p> Your password is: ${password}</p>`
    response.send(html)
  }
})

app.listen(3000, () => {
  console.log('Hooray our app is listening')
})

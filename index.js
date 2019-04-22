var app = require('express')()
var config = require('config')
var chalk = require('chalk')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var fs = require('fs')
var path = require('path')

// routes
var userRoutes = require('./users/user.routes')
var orderRoutes = require('./orders/orders.routes')

// configure varibales
var port = config.get('port')
var mongohost = config.get('mongo.host')
var database = config.get('mongo.database')

// database configuration
mongoose
  .connect(
    `mongodb://${mongohost}/${database}`,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(function (res) {
    console.log(chalk.green('[X]   Database is connected'))
  })
  .catch(function (error) {
    console.log(
      chalk.red('[X] Error occured while connecting to database ' + error)
    )
  })

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'dev'
}

// cors
app.use(cors())

// bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// configure morgan write stream
var accessLogStrem = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})
app.use(morgan('combined', { stream: accessLogStrem }))

// application routes
app.use('/user', userRoutes)
app.use('/orders', orderRoutes)

app.get('/', function (req, res) {
  res.send('server is up')
})

app.listen(port, () => {
  console.log(chalk.green('[X]   SERVER RUNNING ON PORT ' + port))
})

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'


import { adminRouter } from './routes/admin.route'

const app = express()

app.use(
  bodyParser.urlencoded({
    limit: '5mb',
    extended: false,
  }),
)

// app.use(require("body-parser").json());


app.use(cors({
  orgin: '*',
}));

app.use(bodyParser.json());

app.use(express.static('public'))

app.use('/admin', adminRouter)

app.use('/api', function(req, res, next) {
  //console.log(req)
  console.log(`A new request was received at ${new Date().toLocaleString()}`)
  res.send(`Thanks for hitting my api`)
  next()
})

let port = process.env.PORT
if (port == null || port == '') {
  port = 3000
} 

mongoose
  .connect(
    `mongodb+srv://Julianne:M4rzxZgZ5Zwf8bFw@cluster0-tofju.mongodb.net/test?retryWrites=true&w=majority`,
  )
  .then(result => {
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}`
      )
    })
  })
  .catch(err => console.log(err))

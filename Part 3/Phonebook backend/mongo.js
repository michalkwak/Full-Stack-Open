const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.eysx1gg.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Michal',
  number: '420',
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
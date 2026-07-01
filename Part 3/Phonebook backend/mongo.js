const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://fullstack:<db_password>@ac-ly5firt-shard-00-00.eysx1gg.mongodb.net:27017,ac-ly5firt-shard-00-01.eysx1gg.mongodb.net:27017,ac-ly5firt-shard-00-02.eysx1gg.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-hrg58h-shard-0&authSource=admin&appName=Cluster0&retryWrites=true&w=majority`
  .replace('<db_password>', password)

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')

    if (name && number) {
      // Add mode: node mongo.js <password> <name> <number>
      const person = new Person({ name, number })
      return person.save().then(result => {
        console.log('added', result.name, 'number', result.number, 'to phonebook')
        return mongoose.connection.close()
      })
    } else {
      // List mode: node mongo.js <password>
      return Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(p => console.log(p.name, p.number))
        return mongoose.connection.close()
      })
    }
  })
  .catch(err => {
    console.error(err)
    mongoose.connection.close()
  })
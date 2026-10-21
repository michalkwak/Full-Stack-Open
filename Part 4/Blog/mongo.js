const mongoose = require('mongoose')

const args = process.argv.slice(2)

if (args.length !== 1 && args.length !== 4) {
  console.error('Usage:')
  console.error('  node mongo.js <password>')
  console.error('  node mongo.js <password> <title> <author> <url>')
  process.exit(1)
}

const [password, title, author, urlValue] = args

const mongoUrl =
  process.env.MONGODB_URI ||
  'mongodb://fullstack:<db_password>@ac-ly5firt-shard-00-00.eysx1gg.mongodb.net:27017,ac-ly5firt-shard-00-01.eysx1gg.mongodb.net:27017,ac-ly5firt-shard-00-02.eysx1gg.mongodb.net:27017/bloglist?ssl=true&replicaSet=atlas-hrg58h-shard-0&authSource=admin&appName=Cluster0&retryWrites=true&w=majority'
    .replace('<db_password>', password)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
})

const Blog = mongoose.model('Blog', blogSchema)

const main = async () => {
  await mongoose.connect(mongoUrl)
  console.log('connected to MongoDB')

  if (title && author && urlValue) {
    const blog = new Blog({
      title,
      author,
      url: urlValue,
    })

    const savedBlog = await blog.save()
    console.log(`added "${savedBlog.title}" by ${savedBlog.author}`)
  } else {
    const blogs = await Blog.find({})

    console.log('blog posts:')
    blogs.forEach(blog => {
      console.log(`${blog.title} by ${blog.author}: ${blog.url}`)
    })
  }

  await mongoose.connection.close()
}

main().catch(error => {
  console.error(error)
  mongoose.connection.close()
  process.exit(1)
})
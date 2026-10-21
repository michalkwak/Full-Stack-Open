const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test blog number 1',
    author: 'Michal K',
    url: 'www.example-site.com',
    likes: 15,
  },
  {
    title: 'Test blog number 2',
    author: 'Mr Stinky',
    url: 'www.example-site.com',
    likes: 67,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb: blogsInDb
}
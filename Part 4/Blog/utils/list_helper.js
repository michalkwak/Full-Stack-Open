const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorCounts = _.countBy(blogs, 'author')
    const maxAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])
    return { author: maxAuthor, blogs: authorCounts[maxAuthor] }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorLikes = _.reduce(blogs, (result, blog) => {
        if (!result[blog.author]) {
            result[blog.author] = 0
        }
        result[blog.author] += blog.likes
        return result
    }, {})

    const maxAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])
    return { author: maxAuthor, likes: authorLikes[maxAuthor] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
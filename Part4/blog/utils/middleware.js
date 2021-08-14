const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({
        error: 'malformatted id'
      })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({
        error: error.message 
      })
    } else if (error.name === 'JsonWebTokenError') {    
        return response.status(401).json({      
            error: 'invalid token'    
        })  
    }
  
    logger.error(error.message)
  
    next(error)
  }

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request['token'] = authorization.substring(7)
    }

    next()
}

const userExtractor = async (request, response, next) => {
    try {
      const token = (request.token)
      const decodedToken = jwt.verify(token, process.env.SECRET)

      if(!token || !decodedToken) {
          return response.status(401).json({error: "token missing or invalid"})
      }

      request['user'] = await User.findById(decodedToken.id)
    } catch (error) {
      next(error)
    }

    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
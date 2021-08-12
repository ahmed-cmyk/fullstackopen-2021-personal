const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    const username = body.username
    const password = body.password

    if(!username) {
        return response
                .status(401)
                .json({error: "Username missing"})
    } else if(!(username.length >= 3)) {
        return response
                .status(401)
                .json({error: "Username too short"})
    }

    if(!password) {
        return response
                .status(401)
                .json({error: "Password missing"})
    } else if(!(password.length >= 3)) {
        return response
                .status(401)
                .json({error: "Password too short"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = userRouter
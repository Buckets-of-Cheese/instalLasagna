const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

function generateJWT(user_id) {
    const token = sign({user_id}, process.env.JWT_SECRET)

    return token
}

function verifyJWT(token) {
    try {
        const {user_id} = verify(token, process.env.JWT_SECRET)

        return user_id
    } catch (err) {
        throw new GraphQLError('Your milk token has spoiled')
    }
}

function protect(resolver) {
    return async function (_, args, {req, res}) {
        const token = req.cookies.token // grabs the token from the cookie jar

        if (!token) {
            throw new GraphQLError("I'm sorry Dave, I cannot let you do that.")
        }

        try {
            const user_id = verifyJWT(token)

            return resolver(_,args, {req, res, user_id})
        } catch (err) {
            console.log(err)
            throw new GraphQLError('Your token is invalid')
        }
    }
}

module.exports = { generateJWT, verifyJWT, protect }
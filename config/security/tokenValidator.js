const jwt = require('jsonwebtoken')
const db = require('../firebaseConfig')
const secretKey = require('../secretKey')

const validateToken = (req, res, next) => {
    let token = req.headers['authorization']

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided' })
    if (token.split(' ')[0] != 'Bearer') return res.status(401).send({ auth: false, message: 'No token provided' })

    jwt.verify(token.split(' ')[1], secretKey, async (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' })
        let data = await db.collection('users').get()
        data.docs.find(doc => {
            let user = doc.data()
            if (user.id === decoded.id)
                next()
            else
                res.status(500).send({ auth: false, message: 'Failed to authenticate token' })
        })
    })
}

module.exports = validateToken
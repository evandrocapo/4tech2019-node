const jwt = require('jsonwebtoken')
const secretKey = require('../../config/secretKey')

module.exports = routes => {
    const db = routes.config.firebaseConfig.collection('users')

    routes.post('/login', async (req, res, next) => {
        const data = await db.get()
        const user = data.docs.find(async doc => {
            let user = extractUser(doc)
            if (user.email === req.body.email && user.password === req.body.password)
                return true
        })

        if (user) {
            const userId = user.id
            const token = jwt.sign({ userId }, secretKey)
            res.send({ auth: true, token: token })
        } else
            res.status(500).send('Invalid login')
    })
}

const extractUser = doc => {
    let user = doc.data()
    return {
        id: doc.id,
        name: user.name,
        email: user.email,
        password: user.password
    }
}
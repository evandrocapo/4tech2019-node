const userModel = require('../models/user')
const jobModel = require('../models/job')

// simulando um banco de dados
let collectionUsers = []
let collectionJobs = []

module.exports = routes => {

    routes.get('/', (req, res) => {
        res.send('Ok')
    })

    routes.get('/usertest', (req, res) => {
        let x = new userModel.User('João Victor Ignacio', 'joao.ignacio@venturus.org.br', '#$@$%ˆ$#')
        res.send(x)
    })

    routes.post('/users', (req, res) => {
        try{
            let newUser = new userModel.User(
                req.body.name,
                req.body.email,
                req.body.password
            )

            collectionUsers.push(newUser)

            res.send(newUser)
        }
        catch(error)
            { return res.status(500).send(error) }
    })

    routes.get('/users/', (req, res) => {
        res.send(collectionUsers)
    })

    routes.post('/jobs', (req, res) => {
        try{
            let newJob = new jobModel.Job(
                req.body.name,
                req.body.salary,
                req.body.description,
                req.body.skills,
                req.body.area,
                req.body.differentials,
                req.body.isPcd,
                req.body.isActive
            )

            collectionJobs.push(newJob)

            res.send(newJob)
        }
        catch(error)
            { return res.status(500).send(error) }
    })

    routes.get('/jobs/', (req, res) => {
        res.send(collectionJobs)
    })

}
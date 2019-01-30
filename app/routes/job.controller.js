const jobModel = require('../../models/job')
const { check, validationResult } = require('express-validator/check')

let collectionJobs = []

module.exports = routes => {

    routes.get('/jobs/:id', (req, res) => {
        collectionJobs.forEach((job) => {
            if(job.id == req.params.id)
                res.send(job)
        })
    })

    routes.get('/jobs/', (req, res) => {
        res.send(collectionJobs)
    })

    routes.post('/jobs', [check('name').isLength({min:5})], (req, res) => {
        if(!validationResult(req).isEmpty())
            return res.status(422).send('Invalid name')
        try{
            let newJob = new jobModel.Job(
                req.body.id,
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

    routes.put('/jobs/:id', (req, res) => {
        collectionJobs.forEach((job) => {
            if(job.id == req.params.id){
                try{
                    job.name = req.body.name,
                    job.salary = req.body.salary,
                    job.description = req.body.description,
                    job.skills = req.body.skills,
                    job.differentials = req.body.differentials,
                    job.isPcd = req.body.isPcd,
                    job.isActive = req.body.isActive

                    res.send(job)
                }
                catch(error)
                    { return res.status(500).send(error) }
            }
        })
    })

    routes.delete('/jobs/:id', (req, res) => {
        try{
            collectionJobs.forEach((job, index) => {
                if(job.id == req.params.id){
                    collectionJobs.splice(index, 1)
                    return res.send()
                }
            })
        }
        catch(error)
            { return res.status(500).send(error) }
    })

}
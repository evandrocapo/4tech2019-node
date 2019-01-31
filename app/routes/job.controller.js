const jobModel = require('../../models/job')
const { check, validationResult } = require('express-validator/check')

let collectionJobs = []

module.exports = routes => {

    routes.get('/jobs/:id', (req, res) => {
        let job = collectionJobs.find(job => job.id == req.params.id);

        if (job)
            res.status(200).send(job)
        else
            res.status(404).send('Job not found')
    })

    routes.get('/jobs/', (req, res) => {
        res.send(collectionJobs)
    })

    routes.post('/jobs', [check('name').isLength({ min: 5 })], (req, res) => {
        if (!validationResult(req).isEmpty())
            return res.status(422).send('Invalid name')
        try {
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
        catch (error) { return res.status(500).send(error) }
    })

    routes.put('/jobs/:id', (req, res) => {
        let hasJob = false;

        collectionJobs.forEach((job) => {
            if (job.id == req.params.id) {
                hasJob = true
                try {
                    job.name = req.body.name
                    job.salary = req.body.salary
                    job.description = req.body.description
                    job.skills = req.body.skills
                    job.differentials = req.body.differentials
                    job.isPcd = req.body.isPcd
                    job.isActive = req.body.isActive

                    res.send(job)
                }
                catch (error) { return res.status(500).send(error) }
            }
        })
        if (!hasJob) res.status(404).send('Job not found')
    })

    routes.delete('/jobs/:id', (req, res) => {
        try {
            let hasJob = false;

            collectionJobs.forEach((job, index) => {
                if (job.id == req.params.id) {
                    hasJob = true;
                    collectionJobs.splice(index, 1)
                    return res.send('Deleted successfully')
                }
            })
            if (!hasJob) res.status(404).send('Job not found')
        }
        catch (error) { return res.status(500).send(error) }
    })

}
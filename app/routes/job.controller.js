const { check, validationResult } = require('express-validator/check')
const tokenValidator = require('../../config/security/tokenValidator')

module.exports = routes => {

    const db = routes.config.firebaseConfig.collection('jobs')

    routes.get('/jobs/:id', tokenValidator, async (req, res) => {
        try {
            let job = await db.doc(req.params.id).get()

            if (job.exists)
                return res.send(extractJob(job))
            else
                return res.status(404).send('Job not found')
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    routes.get('/jobs/', tokenValidator, async (req, res) => {
        try {
            let docs = await db.get()
            let jobs = []

            docs.forEach(doc => {
                jobs.push(extractJob(doc))
            })

            return res.send(jobs)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    routes.post('/jobs', [tokenValidator, check('name').isLength({ min: 5 })], async (req, res) => {
        if (!validationResult(req).isEmpty())
            return res.status(422).send('Invalid name')
        try {
            await db.doc().set(req.body)

            return res.send('Job added successfully')
        }
        catch (error) {
            return res.status(500).send(error)
        }
    })

    routes.put('/jobs/:id', async (req, res) => {
        try {
            await db.doc(req.params.id).update(req.body)
            return res.send(`A vaga ${req.params.id} foi atualizada com sucesso`)
        }
        catch (error) {
            return res.status(500).send(error)
        }
    })

    routes.delete('/jobs/:id', async (req, res) => {
        try {
            await db.doc(req.params.id).delete()
            return res.send(`A vaga ${req.params.id} foi removida com sucesso`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    extractJob = job => {
        let v = job.data();

        return {
            id: job.id,
            name: v.name,
            salary: v.salary,
            description: v.description,
            skills: v.skills,
            area: v.area,
            differentials: v.differentials,
            isPcd: v.isPcd,
            isActive: v.isActive
        }
    }
}
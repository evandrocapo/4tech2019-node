class Job {
    constructor (name, salary, description, skills, area, differentials, isPcd, isActive) {
        this.name = name
        this.salary = salary
        this.description = description
        this.skills = skills
        this.area = area
        this.differentials = differentials
        this.isPcd = isPcd
        this.isActive = isActive
    }
}

module.exports = { Job }
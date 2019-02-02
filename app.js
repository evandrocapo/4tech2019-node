// Exercício 2 - Organize a Estrutura da nossa Web API

// Imports =========================================================
// Vamos importar o objeto 'server' que configuramos no arquivo
// './config/server'
const server = require('./config/server')

// =================================================================


const port = process.env.PORT || 3000;

server.get('/', async (req, res) => {
    return res.redirect(`https://afternoon-ocean-29603.herokuapp.com/:${port}/vjobs`);
})
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
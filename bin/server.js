require('dotenv').config()
const app = require('../src/app')
const port = normalizaPort(process.env.PORT)

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
	if (port >= 0) {
	        return port;
    }
	return false;
}

app.listen(port, function () {
    console.log(`Serviço iniciado (porta ${port}). Escutando atualizações...`)

    if (process.env.RESTART_SERVICE == 'true')
    	console.log("Para que o sistema possa reiniciar o servico é necessário ser executado no modo administrador")
})
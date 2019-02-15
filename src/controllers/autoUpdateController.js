const util = require('util');
const exec = util.promisify(require('child_process').exec);
const isAdmin = require('is-admin');

exports.post = async (req, res, next) => {
	if (process.env.APP_DEBUG == 'true')
		console.log('Webhook do gitlab recebido, atualizando o projeto...')

	if (process.env.APP_DEBUG == 'true')
		console.log(`Refs da atualização: ${req.body.ref.split('/').slice(-1)}`)

	// Se o push for no branch especificado, executa o comando de atualizacao
    if (req.body.ref.split('/').slice(-1) != process.env.BRANCH)
    {	
		if (process.env.APP_DEBUG == 'true')
			console.log('Atualização não é no branch especificado')
    }
    else
    {
    	if (process.env.APP_DEBUG == 'true')
			console.log('Esperando ', (process.env.DELAY_TO_UPDATE || 1) * 1000, 's para continuar...')
    	
    	setTimeout(async () => {
    		var { stdout, stderr, err } = await exec(
			process.env.PROJECT_PATH.slice(0, 2) + ' && cd ' + process.env.PROJECT_PATH + ' && git fetch && '
			+ 'git pull ' + process.env.REMOTE + ' ' 
			+ process.env.BRANCH)
		
			// Caso de error, imprime na tela
			if (err == true)
			{
				console.log("Erro!")
				console.log(stderr)
			}

			if (process.env.APP_DEBUG == 'true')
				console.log("Projeto atualizado!")

			if (process.env.RESTART_SERVICE == 'true')
			{
				var is_admin = await isAdmin()

				if (is_admin)
				{
					if (process.env.APP_DEBUG == 'true')
						console.log(`Parando o serviço ${process.env.SERVICE_NAME}`)

					var { stdout, stderr, err } = await exec(`net stop ${process.env.SERVICE_NAME}`)
					var { stdout, stderr, err } = await exec(`net start ${process.env.SERVICE_NAME}`)

					if (process.env.APP_DEBUG == 'true')
						console.log(`Serviço reiniciado com sucesso!\n`)
				}
				else
				{
					console.log("Erro ao reiniciar o serviço! Para tal ação é necessário que o sistema seja iniciado com permissões de administrador")
				}
			}
    	},(process.env.DELAY_TO_UPDATE || 0) * 1000)
		
    }

	if (process.env.APP_DEBUG == 'true')
		console.log("\n")
	// Envia resposta
    res.status(200).send('ok')
};
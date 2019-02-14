const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.post = async (req, res, next) => {
	if (process.env.APP_DEBUG)
		console.log('Webhook do gitlab recebido, atualizando o projeto...')

	if (process.env.APP_DEBUG)
		console.log(`Refs da atualização: ${req.body.ref.split('/').slice(-1)}`)

	// Se o push for no branch especificado, executa o comando de atualizacao
    if (req.body.ref.split('/').slice(-1) != process.env.BRANCH)
    {	
		if (process.env.APP_DEBUG)
			console.log('Atualização não é no branch especificado')
    }
    else
    {
		const { stdout, stderr, err } = await exec(
			'cd ' + process.env.PROJECT_PATH + ' && git fetch && '
			+ 'git pull ' + process.env.REMOTE + ' ' 
			+ process.env.BRANCH)
		
		// Caso de error, imprime na tela
		if (err)
		{
			console.log("Erro!")
			console.log(stderr)
		}

		if (process.env.APP_DEBUG)
			console.log('Projeto atualizado')

    }
	// Envia resposta
    res.status(200).send('ok')
};
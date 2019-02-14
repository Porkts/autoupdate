const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.post = async (req, res, next) => {
	if (process.env.APP_DEBUG)
		console.log('Webhook do gitlab recebido, atualizando o projeto...')

	// Executando o comando de atualizacao
    const { stdout, stderr, err } = await exec('cd ' + process.env.PROJECT_PATH + ' && git pull ' + process.env.REMOTE + ' ' + process.env.BRANCH)

    // Caso de error, imprime na tela
    if (err)
    {
		console.log("Erro!")
		console.log(stderr)
    }

	if (process.env.APP_DEBUG)
		console.log('Projeto atualizado')

	// Envia resposta
    res.status(200).send('ok')
};
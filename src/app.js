const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser');

// Rotas
const index = require('./routes/index')
const autoUpdateRoute = require('./routes/autoUpdateRoute')

// Middleware
var verifyGitlabToken = (req, res, next) => {
	if (process.env.APP_DEBUG)
		console.log('Nova requisição recebida, verificando token...')

	if (req.header("X-Gitlab-Token") == process.env.GITLAB_TOKEN)
	{
		if (process.env.APP_DEBUG)
			console.log('Token Aprovado')
    	
    	next()
	}
	else
	{
		res.status(401).send('Unauthorized')
		return
	}
};

app.use(verifyGitlabToken)
app.use(bodyParser.json())

app.use('/', index)
app.use('/autoupdate', autoUpdateRoute)

module.exports = app
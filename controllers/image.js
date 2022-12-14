const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '1b98a94713fc41feb3f04c887d6620c2'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then (entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to retrieve entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}
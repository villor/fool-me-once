import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api', (req, res) => {
	res.send('Fool me once!');
});

const server = app.listen(process.env.PORT || 3000, () => {
	const {
		address,
		port
	} = server.address();

	console.log(`Fool-me-once listening at http://${address}:${port}`);
});

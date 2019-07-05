const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs')

const URL = 'https://www.imdb.com/chart/moviemeter'


request(URL, function (err, res, body) {
	if (err) console.log('Erro: ' + err);

	let $ = cheerio.load(body);
	let movies = []

	$('.lister-list tr').each(function () {
		let title = $(this).find('.titleColumn a').text().trim();
		let rating = $(this).find('.imdbRating strong').text().trim();

		movies.push({
			movie: title,
			rating: rating
		})

	})

	// console.log(movies);

	fs.appendFile('data.json', movies);

});
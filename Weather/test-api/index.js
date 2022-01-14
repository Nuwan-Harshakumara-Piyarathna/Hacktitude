//PORT to run server
const PORT = process.env.PORT || 8000 //deployment in heroku

//listen to PORT
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');
const {response} = require('express');

//calling express
const app = express();

const news = [
	{
		name:'techcrunch',
		address:'https://techcrunch.com/startups/',
		prefix: ''
	},
	{
		name:'hackernews',
		address:'https://thehackernews.com/',
		prefix:''
	},
	{
		name:'dev.to',
		address:'https://dev.to/t/news',
		prefix:'https://dev.to/'
	}
]

news.forEach(article => {
	
	axios.get(article.address)
		.then((response)=>{
			const html = response.data
			// console.log(html)
			const $ = cheerio.load(html)
		
			//search for Software keyword in given url
			$('a:contains("Software")',html).each(function () {
				const title = $(this).text()
				const url = $(this).attr('href')
				console.log(title)
				articles.push({
					title,
					url : article.prefix + url,
					source: article.name
				})
			})
		}).catch(err => console.log(err))
})

const articles = []

//Visitng homepage 
app.get('/',(req,res)=>{
	res.json("Welcome to the api")

})

app.get('/data' , (req,res)=>{
	res.json(articles)
})

app.get('/data/:newsId',(req,res)=>{
	console.log(req.params.newsId)
	const newsId = req.params.newsId

	const articleAdd = news.filter(news => news.name == newsId)[0].address
	const articlePrefix = news.filter(news => news.name == newsId)[0].prefix

	// console.log(articleAdd)
	axios.get(articleAdd)
		.then(response => {
			const html = response.data
			const $ = cheerio.load(html)
			const specificArticles = []

			$('a:contains("Software")',html).each(function (){
				const title = $(this).text()
				const url = $(this).attr('href')
				specificArticles.push({
					title,
					url: articlePrefix + articleAdd,
					source : newsId
				})
			})
			res.json(specificArticles)
		}).catch(err=> console.log(err))
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
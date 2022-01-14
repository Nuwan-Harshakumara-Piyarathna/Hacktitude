//PORT to run server
const PORT = 8080

//listen to PORT
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');
const {response} = require('express');

//calling express
const app = express();

//Visitng homepage 
app.get('/',(req,res)=>{
	res.json("Welcome to the api")

})

app.get('/data' , (req,res)=>{
	axios.get('https://techcrunch.com/startups/')
		.then((response)=>{
			const html = response.data
			const $ = cheerio.load(html)
			
			$('a:contains("climate")',html).each(function () {

			})
		})
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))




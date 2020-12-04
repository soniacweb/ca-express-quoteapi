const express = require('express')
const app = express()

const { quotes } = require('./data')
const { getRandomElement } = require('./utils')

const PORT = process.env.PORT || 8000

app.use(express.static('public'))

//listening to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//get random quotes
app.get('/api/quotes/random', (req, res, next) => {
  // Here we would send back the moods array in response
  const randomQuote = getRandomElement(quotes)
  if (randomQuote) {
    res.send(
      { 
        quote: randomQuote 
      })
  } else {
    res.status(404).send()
  }
  
})

//get all quotes or send error if no quotes
// app.get('/api/quotes', (req, res, next) => {
//   const allQuotes = { quotes: quotes }
//   if (allQuotes) {
//     res.send(
//       { 
//         quote: allQuotes 
//       })
//   } else {
//     res.status(404).send()
//   }
// })

//by author
app.get('/api/quotes', (req, res, next) => {
  const reqPerson = req.query.person
  if (!reqPerson) {
    res.send({ quotes: quotes })
    next()
  } else if (reqPerson) {
    const filteredSearch = quotes.filter(quote => quote.person === reqPerson)
    console.log(filteredSearch)
    res.send({ quotes: filteredSearch }) 
  } 
})

//post new quote
app.post('/api/quotes', (req, res) => {
  const newEntry = req.query.quote && req.query.person.length
  if (newEntry) {
    quotes.push(req.query)
    res.status(201).send({ quotes: req.query })
  } else {
    res.status(400).send('You must enter a quote and an author')
  }
})

//put request 
app.put('/api/quotes/:id', (req, res) => {

})

//delete request
app.delete('/api/quotes/:id', (req, res) => {

})
const quoteContainer = document.getElementById('quote__container'),
   quoteText = document.getElementById('quote'),
   quoteAuthor = document.getElementById('author'),
   twitterBtn = document.getElementById('twitter'),
   newQuoteBtn = document.getElementById('new__quote'),
   loader = document.getElementById('loader')

const apiQuotes = []

// Loader

function toggleLoader(isLoading) {
   loader.hidden = !isLoading
   quoteContainer.hidden = isLoading
}

// Get Quote from API

async function getQuote() {
   toggleLoader(true)
   try {
      const response = await fetch(
         'https://jacintodesign.github.io/quotes-api/data/quotes.json'
      )
      apiQuotes.push(...(await response.json()))
   } catch (error) {
      console.error('Error fetching quotes:', error)
   } finally {
      toggleLoader(false)
   }
}

function newQuote() {
   toggleLoader(true)
   const quote = apiQuotes.length
      ? apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
      : null

   quoteAuthor.textContent = quote ? quote.author || 'Unknown' : 'Unknown'
   quoteText.classList.toggle('long__quote', quote && quote.text.length > 120)
   quoteText.textContent = quote ? quote.text : ''
   toggleLoader(false)
}

function tweetQuote() {
   const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quoteText.textContent
   )} -- ${encodeURIComponent(quoteAuthor.textContent)}`
   window.open(tweetUrl, '_blank')
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load

getQuote()

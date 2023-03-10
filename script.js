// Fetching Data from API with JavaScript

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading Spinner
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  loading();
  // fixing cors error
  const proxyUrl = "https://corsanywhere.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    // console.log(data);

    // Stop Loader, Show the Quote
    complete();
  } catch (error) {
    getQuote();
    // console.log("whoops, no quote!", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------

// Getting Quotes from Local source or Fetch API

// const quoteContainer = document.getElementById("quote-container");
// const quoteText = document.getElementById("quote");
// const authorText = document.getElementById("author");
// const twitterBtn = document.getElementById("twitter");
// const newQuoteBtn = document.getElementById("new-quote");
// const loader = document.getElementById("loader");

// let apiQuotes = [];

// // Show Loading
// function loading() {
//   loader.hidden = false;
//   quoteContainer.hidden = true;
// }

// // Hide Loading
// function complete() {
//   quoteContainer.hidden = false;
//   loader.hidden = true;
// }

// // Show New Quote
// function newQuote() {
//   loading();
//   // Pick a random quote from the apiQuotes array
//   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//   //   Check if Author field is blank and replace it with unknown
//   if (!quote.author) {
//     authorText.textContent = "Unknown";
//   } else {
//     authorText.textContent = quote.author;
//   }

//   //   Check quote length to determine styling
//   if (quote.text.length > 40) {
//     quoteText.classList.add("long-quote");
//   } else {
//     quoteText.classList.remove("long-quote");
//   }
//   // Set Quote, Hide Loader
//   quoteText.textContent = quote.text;
//   complete();
// }

// // Get Quotes from API
// async function getQuotes() {
//   loading();
//   const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
//   try {
//     const response = await fetch(apiUrl);
//     apiQuotes = await response.json();
//     // getting the JSON from the API and turning it into an object
//     // then passing that into a global variable called apiQuotes
//     // you would only use a const if the data was never changing

//     newQuote();
//   } catch (error) {
//     // alert(error)
//     // Catch Error Here
//   }
// }

// //  Tweet Quote
// function tweetQuote() {
//   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
//   window.open(twitterUrl, "_blank");
// }

// // Event Listeners
// newQuoteBtn.addEventListener("click", newQuote);
// twitterBtn.addEventListener("click", newQuote);

// // On Load
// getQuotes();

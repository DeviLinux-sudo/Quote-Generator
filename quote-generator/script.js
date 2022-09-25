const quoteGenerator = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


// show loading 
function loading(){
     loader.hidden = false;
     quoteGenerator.hidden = true;
}

//hide Loading
function complete(){
    quoteGenerator.hidden = false;
    loader.hidden = true;
}

//show new Quote
function newQuote() {
    loading();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If no author 
    if(!quote.author){
        quoteAuthor.textContent="Unknown";
    }else{
        quoteAuthor.textContent=quote.author;
    }
    //If text length is more than 120
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
       
    }else{
        quoteText.classList.remove('long-quote');
       
    }
    //set quote and hide Loader
    quoteText.textContent = quote.text;
    complete();
}
// get Quotes from API


async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        console.log(apiQuotes);
    }catch (error){

    }
}

//Tweet a Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}


//event listeners
newquoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// onLoad

getQuotes();

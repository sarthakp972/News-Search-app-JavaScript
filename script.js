const api_key = "e4d52275547642648a1f49412de1f1af";
const blogcontainer = document.getElementById("blog-container");

async function fetchRandomNews() {
    try {
        const api_url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${api_key}`;
        const response = await fetch(api_url);
        const data = await response.json();
        return data.articles; // Returns the articles fetched from the API
    } catch (error) {
        console.log("Error fetching in Random News", error);
        return [];
    }
}
const searchButton=document.getElementById("search-button")
const  searchField=document.getElementById("search-input")

searchButton.addEventListener("click",async ()=>{
const query=searchField.value;
console.log(query);
if(query!==" "){
    try {
        const articles=await fetchNewsQuery(query);
        displayBlogs(articles);
    } catch (error) {
        console.log("data is not fetching",error);
    }
}
})

async function fetchNewsQuery(query){
    try {
        const api_url = `https://newsapi.org/v2/everything?q=${query}=10&apikey=${api_key}`;
        const response = await fetch(api_url);
        const data = await response.json();
        return data.articles; // Returns the articles fetched from the API
    } catch (error) {
        console.log("Error fetching in Random News", error);
        return [];
    }
}


function displayBlogs(articles) {
 
    blogcontainer.innerHTML = "";

   
    if (articles.length === 0) {
        const noArticlesMessage = document.createElement("p");
        noArticlesMessage.textContent = "No articles available.";
        blogcontainer.appendChild(noArticlesMessage);
        return;
    }

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h1");
        // title.textContent = article.title;
            const truncatedtitle=article.title.length>30?article.title.slice(0,30)+"....":article.title;
            title.textContent=truncatedtitle;


        const description = document.createElement("p");
        const trunckeddescription=article.description.length>100?article.description.slice(0,100)+".... ":article.description;
        description.textContent = trunckeddescription;

    
        blogCard.appendChild(img);
        blogCard.appendChild(title);

        blogCard.addEventListener('click',()=>{
            window.open(article.url,"_black")
        });

        blogCard.appendChild(description);

        
        blogcontainer.appendChild(blogCard);
    });
}


(async () => {
    const articles = await fetchRandomNews();
    console.log(articles);
    displayBlogs(articles);
})();

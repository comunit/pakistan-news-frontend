// get dom elements
let top_Story = document.querySelector('.top-story')
let main_News = document.querySelector('.main-news')
let geoNews = document.querySelector('#geonews');
let aryNews = document.querySelector('#arynews');
let dunyaNews = document.querySelector('#dunyanews');
let dawnNews = document.querySelector('#dawnnews');
let dailyPakistan = document.querySelector('#dailypakistan');
let source = '';
let sourceArray = ['geonews', 'arynews', 'dunyanews', 'dawnnews', 'dailypakistan']

window.addEventListener('click', function(e) {
  e.stopPropagation();
  e.preventDefault();
  for (let i = 0; i < sourceArray.length; i++) {
    const newsSource = sourceArray[i];
    if(e.target.id === newsSource) {
      top_Story.innerHTML = '';
      main_News.innerHTML = '';
      fetchNews(newsSource);
    }
  }
})


function fetchNews(source) {
  //fetch data from api
fetch(`https://pakstan-new-api.herokuapp.com/api/${source}`)
.then((res) => res.json())
.then((data) => {
 data.forEach(data => {
   if (data.topstory == true) {
    topStoryContent = `
    <div class="col m6 s12">
      <img class="top-story-img" src="${data.image}">
    </div>
    <div class="col m6 s12 top-story-container">
      <span class="new badge top-story-badge" data-badge-caption="Top Story"></span>
      <h3 class="top-story-title">${data.title}</h3>
      <br>
      <br>
      <a href="${data.link}" class="waves-effect waves-light btn">Read More</a>
    </div>
    `
    top_Story.innerHTML = topStoryContent;
   } else if (data.description) {
    {
      let content = `
      <div class="col s12 m4">
           <div class="card">
             <div class="card-image">
               <img class="main-news-image" src="${data.image}">
               <span class="card-title main-news-title">${data.title}</span>
             </div>
             <div class="card-content">
               <p>${data.description}</p>
             </div>
             <div class="card-action">
               <a href="${data.link}">Read More</a>
             </div>
           </div>
         </div>
      `
      main_News.innerHTML += content;
     }
   } else {
    let content = `
    <div class="col s12 m4">
         <div class="card">
           <div class="card-image">
             <img class="main-news-image" src="${data.image}">
             <span class="card-title main-news-title">${data.title}</span>
           </div>
           <div class="card-action">
             <a href="${data.link}">Read More</a>
           </div>
         </div>
       </div>
    `
    main_News.innerHTML += content;
   }
 });
})
}
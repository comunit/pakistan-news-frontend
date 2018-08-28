// get dom elements
let top_Story = document.querySelector('.top-story');
let main_News = document.querySelector('.main-news');
let welcomePage = document.querySelector('.welcome-page');
let welcomePageH2 = document.querySelector('.welcome-page-h2');
let allLinks = document.querySelectorAll('.get-news');
let logo = document.querySelector('.brand-logo');
let progressCircle = document.querySelector('.radial-progress');
let source = '';
let onErrorPic = "http://www.raincityhousing.org/wordpress/wp-content/uploads/2013/04/NEWS_LogoRGB_FIN.jpg";
let sourceArray = ['geonews', 'arynews', 'dunyanews', 'dawnnews', 'dailypakistan', 'expresstribune']

for (let i = 0; i < allLinks.length; i++) {
  const news_link = allLinks[i];
  news_link.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.id === news_link.id) {
      top_Story.innerHTML = '';
      main_News.innerHTML = '';
      logo.innerHTML = news_link.innerHTML;
      progressCircle.style.display = 'none';
      fetchNews(e.target.id);
    }
  })
}


async function fetchNews(source) {
  // show welcome//loading message
  welcomePage.style.display = 'block';
  // show loading message
  welcomePageH2.innerHTML = 'Loading';
  // show spinners
  top_Story.classList.add('spinner-3');
  await makeRequest(source).then(() => {
   welcomePage.style.display = 'none';
   top_Story.classList.remove('spinner-3');
  })
}

// make request for api
function makeRequest(source) {
  //fetch data from api
  return new Promise(resolve => {
      resolve(
        fetch(`https://pakstan-new-api.herokuapp.com/api/${source}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach(data => {
            if (data.topstory == true) {
              topStoryContent = `
        <div class="col m6 s12">
          <img class="top-story-img" onerror="this.src='${onErrorPic}'" src="${data.image}">
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
                   <img class="main-news-image" onerror="this.src='${onErrorPic}'" src="${data.image}">
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
                 <img class="main-news-image" onerror="this.src='${onErrorPic}'" src="${data.image}">
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
      )
  })
}
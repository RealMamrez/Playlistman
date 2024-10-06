// const API
const usersAPI = (`API-LINK/USERS`)
const tagsAPI = (`API-LINK/TAGS`)
const topPlaylistAPI = (`API-LINK/TOP-PLAYLIST`)
const newPlaylistAPI = (`API-LINK/NEW-PLAYLIST`)
const allPlaylistAPI = (`API-LINK/PLAYLIST`)


const trendingGridContainer = document.querySelector(
  ".trending .grid-container"
);
const topGridContainer = document.querySelector(".top .grid-container");
const searchBox = document.querySelector("#search-box");
const tagsSearch = document.querySelector(".tags");

let countID = 0;

let page = 1;
let limit = 12;
let allowLoading = true;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Add tags
const getTags = async () => {
  const result = await fetch(`${tagsAPI}`);

  return result.json();
};

const showTags = async () => {
  const getAllTags = await getTags();

  getAllTags.forEach((post) => {
    let allTag = post.tagID;
    allTagLength = allTag.length;

    for (let i = 0; i < allTag.length; i++) {
      const element = document.createElement("span");
      element.classList.add("tag");
      element.id = allTag[i];

      element.innerHTML = `${allTag[i]}`;

      tagsSearch.appendChild(element);
    }
  });
};
showTags();

//Top Playlist
const getTopPlaylist = async () => {
  const result = await fetch(`${topPlaylistAPI}`);

  return result.json();
};

const showTopPlaylist = async () => {
  const getAllTopPlaylist = await getTopPlaylist();

  getAllTopPlaylist.forEach((post) => {
    const element = document.createElement("div");
    element.classList.add("grid-item");

    let tagMore = post.tags.length - 2;
    element.innerHTML = `

        <a onclick="showBtn('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}')"><img src="${post.playlistcover}" alt="Music Cover" class="cover-img"></a>
                <a href=""><img src="./assets/image/${post.platform}.png" class="platform-icon"></a>
                <p class="playlist-name">${post.playlistname}</p>
                <div class="tags-section">
                    <span class="tag">${post.tags[0]}</span>
                    <span class="tag">${post.tags[1]}</span>
                    <span class="tag">${tagMore}</span>
                </div>
                <div class="down">
                    <div class="description">
                        <p>${post.description}</p>
                    </div>
                    <div class="btn-box">
                        <button class="show-playlist-btn" onclick="showBtn('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}')">SHOW PLAYLIST</button>
                        <a href="https://spotify-downloader.com/?link=${post.playlistlink}"><div class="download-playlist-btn">
                                <i class="fa-solid fa-download"></i>
                                <p class="download">Download</p>
                        </div><a>
                    </div>
                </div>
        
        `;

    topGridContainer.appendChild(element);
  });
};

showTopPlaylist();

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

//Trading Playlist
const getPlaylistAll = async () => {
  const result = await fetch(
    `${allPlaylistAPI}`
  );

  return result.json();
};

const getPlaylist = async () => {
  const result = await fetch(
    `${allPlaylistAPI}?_page=${page}&_limit=${limit}`
  );

  return result.json();
};

const showPlaylist = async () => {
  const getAllPlaylist = await getPlaylist();
  shuffle(getAllPlaylist)


  getAllPlaylist.forEach((post) => {
    const element = document.createElement("div");
    element.classList.add("grid-item");

    let tagMore = post.tags.length - 2;

    coverNum = 16;

    if (post.playlistcover !== "") {
      element.innerHTML = `

            <a href=""><img src="${post.playlistcover}" alt="Music Cover" class="cover-img"></a>
                    <a href=""><img src="./assets/image/${post.platform}.png" class="platform-icon"></a>
                    <p class="playlist-name">${post.playlistname}</p>
                    <div class="tags-section">
                        <span class="tag">${post.tags[0]}</span>
                        <span class="tag">${post.tags[1]}</span>
                        <span class="tag">${tagMore}</span>
                    </div>
                    <div class="down">
                        <div class="description">
                            <p>${post.description}</p>
                        </div>
                        <div class="btn-box">
                            <button class="show-playlist-btn" onclick="showBtn('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}', '${coverNum}')">SHOW PLAYLIST</button>
                            <a href="https://spotify-downloader.com/?link=${post.playlistlink}"><div class="download-playlist-btn">
                                <i class="fa-solid fa-download"></i>
                                <p class="download">Download</p>
                            </div><a> 
                        </div>
                    </div>
            
            `;
    } else {
      element.innerHTML = `

            <a href=""><img src="./assets/image/cover/${coverNum}.jpg" alt="Music Cover" class="cover-img"></a>
                    <a href=""><img src="./assets/image/${post.platform}.png" class="platform-icon"></a>
                    <p class="playlist-name">${post.playlistname}</p>
                    <div class="tags-section">
                        <span class="tag">${post.tags[0]}</span>
                        <span class="tag">${post.tags[1]}</span>
                        <span class="tag">${tagMore}</span>
                    </div>
                    <div class="down">
                        <div class="description">
                            <p>${post.description}</p>
                        </div>
                        <div class="btn-box">
                            <button class="show-playlist-btn" onclick="showBtn('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}', '${coverNum}')">SHOW PLAYLIST</button>
                            <a href="https://spotify-downloader.com/?link=${post.playlistlink}"><div class="download-playlist-btn">
                                <i class="fa-solid fa-download"></i>
                                <p class="download">Download</p>
                            </div><a>
                        </div>
                    </div>
            `;
    }

    trendingGridContainer.appendChild(element);
  });
};

showPlaylist();

const showBtn = (
  playlistCover,
  playlistName,
  playlistDesc,
  playlistTag,
  playlistLink,
  coverNum
) => {
  const pup = document.querySelector(".pup");
  const blackCover = document.querySelector(".black-cover");

  const playlistTags = playlistTag.split(",");

  if (playlistCover !== "") {
    pup.innerHTML = `
        <div class="all-pup">
          <div class="all-a">
            <div class="get-back">
            <i class="fa-solid fa-circle-xmark hg" onclick="closeBtn()"></i>
            </div>
            <div class="head-pup">
                  <a href=""><img src="${playlistCover}"></a>
                  <h1 class="playlistname-pup">${playlistName}</h1>
              </div>
              <div class="tags-pup">
                  <div class="tags">
      
                  </div>
              </div>
              <div class="des-pup">
                  <h1>Description</h1>
                  <p>${playlistDesc}</p>
              </div>
              <div class="table-pup">
                  <div class="blur">
                      <h1>Track List</h1>
                      <img src="./assets/image/table.png">
                  </div>
                  <p class="dev">Developing . . .</p>
              </div>
          </div>
          <div class="all-b">
            <div class="btn-pup">
                  <button class="btn-go" onclick="window.open('${playlistLink}')">Open Playlist</button>
                  <a href="https://spotify-downloader.com/?link=${playlistLink}"></a>
                  <div class="dl-btn">
                      <i class="fa-regular fa-floppy-disk download-btn-i"></i>
                  </div>
            </div>
          </div>
        </div>
        
        `;
  }

  const tags = document.querySelector(".pup .tags-pup .tags");

  for (let i = 0; i < playlistTags.length; i++) {
    const elTag = document.createElement("span");
    elTag.classList.add("tag");

    elTag.innerHTML = `${playlistTags[i]}`;

    tags.appendChild(elTag);
  }

  const clientwidth = window.innerWidth;
  blackCover.style.visibility = "visible";
  pup.style.display = "block";
  blackCover.style.top = `${window.scrollY}px`;
  document.body.classList.add("remove-scrolling");
  if (clientwidth > 700) {
    pup.style.top = `${window.scrollY + window.innerHeight / 2}px`;
  }
  else{
    pup.style.top = `${window.scrollY}px`;
  }
};

const closeBtn = () => {
  const pup = document.querySelector(".pup");
  const blackCover = document.querySelector(".black-cover");

  document.body.classList.remove("remove-scrolling");
  blackCover.style.visibility = "hidden";
  pup.style.display = "none";
};

const getPlaylistForCount = async () => {
  const result = await fetch(`${allPlaylistAPI}`);

  return result.json();
};

const getCountID = async () => {
  const getAllPlaylist2 = await getPlaylistForCount();
  countID = 0;
  getAllPlaylist2.forEach((post) => {
    countID += 1;
  });
  return countID;
};

const showLoading = () => {
  if (allowLoading) {
    document.querySelector(".load-more").classList.add("active");

    setTimeout(() => {
      document.querySelector(".load-more").classList.remove("active");

      page++;
      showPlaylist();
    }, 1000);
  }
};

window.addEventListener("scroll", () => {
  if (
    Math.abs(
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        document.documentElement.clientHeight
    ) < 1
  ) {
    getCountID();
    const element = document.querySelectorAll(".trending .grid-container");
    if (element.length == countID) {
      allowLoading = false;
      console.log(element.length + "=" + countID);
    } else {
      allowLoading = true;
      showLoading();
    }
  }
});

const searchedPhrase = (section, phrase, term, post) => {
  const spilltedPhrase = phrase.split(" ");
  const keyword = spilltedPhrase.find((word) => word.toUpperCase() === term);
  const index = spilltedPhrase.indexOf(keyword);
  spilltedPhrase[
    index
  ] = `<span style="background-color: #134fe5; padding: 0 3px; border-radius: 4">${keyword}</span>`;

  section === "title"
    ? (post.querySelector(".playlist-name").innerHTML =
        spilltedPhrase.join(" "))
    : (post.querySelector(".description").innerHTML = spilltedPhrase.join(" "));
};

const filterPlaylist = (event) => {
  tagUnclicked()
  if (searchBox.value !== "") {
    allowLoading = false;

    const topSection = document.querySelector(".top");
    const term = event.target.value.toUpperCase();
    const titleSection = document.querySelector(".trending .section-title");
    const desSection = document.querySelector(".trending .section-description");

    topSection.style.display = "none";
    titleSection.innerHTML = `Search results for ${searchBox.value}`;
    desSection.innerHTML = `We are trying to develop and improve parts of this website every day! We apologize if this section is not efficient enough for you`;

    const playlist = document.querySelectorAll(".grid-item");
    playlist.forEach((post) => {
      const title = post.querySelector(".playlist-name").innerText;
      const body = post.querySelector(".description").innerText;

      if (
        title.toUpperCase().indexOf(term) > -1 ||
        body.toUpperCase().indexOf(term) > -1
      ) {
        post.style.display = "block";
        searchedPhrase("title", title, term, post);
        searchedPhrase("body", body, term, post);
      } else {
        post.style.display = "none";
      }
    });
  } 
  else {
    allowLoading = true;
    const term = event.target.value.toUpperCase();
    const topSection = document.querySelector(".top");

    topSection.style.display = "block";

    const playlist = document.querySelectorAll(".grid-item");

    const titleSection = document.querySelector(".trending .section-title");
    const desSection = document.querySelector(".trending .section-description");

    titleSection.innerHTML = `Trending New Playlist`;
    desSection.innerHTML = `New playlist that arse gaining like quickly`;

    playlist.forEach((post) => {
      const title = post.querySelector(".playlist-name").innerText;
      const body = post.querySelector(".description").innerText;

      if (
        title.toUpperCase().indexOf(term) > -1 ||
        body.toUpperCase().indexOf(term) > -1
      ) {
        post.style.display = "block";
      } else {
        post.style.display = "block";
      }
    });
  }
};

searchBox.addEventListener("input", filterPlaylist);

const tagClicked = document.querySelectorAll(".grid-item");

tagClicked.forEach((post) => {
  console.log("hello");
});

const filterTags = (id) => {
  console.log(id);
};


const tagClikedFun = async () => {
  const getAllTags = await getTags();
  const getAllPlaylist = await getPlaylistAll();

  getAllTags.forEach((post) => {
    let allTag = post.tagID;
    allTagLength = allTag.length;

    for (let i = 0; i < allTagLength; i++) {

      document
        .getElementById(`${allTag[i]}`)
        .addEventListener("click", () => {
          const searchTagContainer = document.querySelector('.tag-search .grid-container')

          searchTagContainer.innerHTML = ` `
          getAllPlaylist.forEach((post) => {
            const tagArrey = post.tags

            if (tagArrey.indexOf(allTag[i]) > -1 ) {
              const searchTagTitle = document.querySelector('.tag-search .section-title')
              const searchTagDescription = document.querySelector('.tag-search .section-description')

              document.querySelector('.top').style.display = 'none'
              document.querySelector('.trending').style.display = 'none'

              searchTagTitle.innerHTML = `<i class="fa-solid fa-circle-xmark"  onclick="tagUnclicked()"></i>Search results for <span class="searchedTag">${allTag[i]}</span>`
              searchTagDescription.innerHTML = `We are trying to develop and improve parts of this website every day! We apologize if this section is not efficient enough for you`

              const element = document.createElement("div");
              element.classList.add("grid-item");

              let tagMore = post.tags.length - 2;
              element.innerHTML = `

                  <a onclick="showBtn('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}')"><img src="${post.playlistcover}" alt="Music Cover" class="cover-img"></a>
                          <a href=""><img src="./assets/image/${post.platform}.png" class="platform-icon"></a>
                          <p class="playlist-name">${post.playlistname}</p>
                          <div class="tags-section">
                              <span class="tag">${post.tags[0]}</span>
                              <span class="tag">${post.tags[1]}</span>
                              <span class="tag">${tagMore}</span>
                          </div>
                          <div class="down">
                              <div class="description">
                                  <p>${post.description}</p>
                              </div>
                              <div class="btn-box">
                                  <button class="show-playlist-btn" onclick="showBtn('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}')">SHOW PLAYLIST</button>
                                  <a href="https://spotify-downloader.com/?link=${post.playlistlink}"><div class="download-playlist-btn">
                                          <i class="fa-solid fa-download"></i>
                                          <p class="download">Download</p>
                                  </div><a>
                              </div>
                          </div>
                  
                  `;

              searchTagContainer.appendChild(element);              
            }
            
          });
        });
    }
  });
};

tagClikedFun();


const tagUnclicked = () => {

  document.querySelector('.tag-search .grid-container').innerHTML = ``;
  document.querySelector('.tag-search .section-title').innerHTML = ``;
  document.querySelector('.tag-search .section-description').innerHTML = ``;
  document.querySelector('.top').style.display = 'block'
  document.querySelector('.trending').style.display = 'block'

}
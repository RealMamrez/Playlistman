// const API
const usersAPI = (`API-LINK/USERS`)
const tagsAPI = (`API-LINK/TAGS`)
const topPlaylistAPI = (`API-LINK/TOP-PLAYLIST`)
const newPlaylistAPI = (`API-LINK/NEW-PLAYLIST`)
const allPlaylistAPI = (`API-LINK/PLAYLIST`)


const tagSection = document.querySelector(".tags-input");
const errorCard = document.querySelector(".error-card");
errorCard.style.top = `${window.scrollY + (window.innerHeight - 100)}px`;

let allTagLength;
let countID = 0;

let selectedPlatform;
let selectedTags = [];
let selectedTagsIf = [];

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

      tagSection.appendChild(element);
    }
  });

  let count = [];

  for (let ii = 1; ii < allTagLength + 1; ii++) {
    document
      .querySelector(`.tags-input .tag:nth-child(${ii})`)
      .addEventListener("click", (event) => {
        count.push(ii);
        for (let s = 0; s < count.length - 2; s++) {
          if (count[s] == count[count.length - 1]) {
            count.pop();
          }
        }

        if (count.length > 8) {
          let tagElements = document.querySelectorAll(`.tags-input .tag`);
          let tagArray = Array.from(tagElements); // Convert NodeList to array

          if (true) {
            tagArray[count[0] - 1].classList.remove("active");
            count.shift();
          }
        }

        document
          .querySelector(`.tags-input .tag:nth-child(${ii})`)
          .classList.toggle("active");
      });
  }
};
showTags();

async function addPlaylist(obj) {
  await fetch(`${newPlaylistAPI}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
}

const getPlaylist = async () => {
  const result = await fetch(`${newPlaylistAPI}`)

  return result.json()
}

const isValidUrl = urlString =>{
  var inputElement = document.createElement('input');
  inputElement.type = 'url';
  inputElement.value = urlString;

  if (!inputElement.checkValidity()) {
    return false;
  } else {
    return true;
  }
}

const getCountID = async () => {
  const getAllPlaylist = await getPlaylist();
  countID = 0;
  getAllPlaylist.forEach(post => {
    countID += 1;
  });
  return countID;
}
getCountID()

const playlistDataOk = () => {
  for (let o = 0; o < allTagLength; o++) {
    let tagElements = document.querySelectorAll(`.tags-input .tag`);
    let tagArray = Array.from(tagElements);

    if (tagArray[o].classList.contains("active")) {
      selectedTags.push(`${tagArray[o].id}`);
    }
  }


  const newPlaylist = {
    id: `${countID + 1}`,
    playlistname: `${document.querySelector("#playlist-name").value}`,
    playlistlink: `${document.querySelector("#playlist-link").value}`,
    playlistcover: `${document.querySelector("#playlist-cover").value}`,
    playlistauther: `${document.querySelector("#playlist-auther").value}`,
    description: `${document.querySelector("#playlist-description").value}`,
    platform: `${selectedPlatform}`,
    tags: selectedTags,
  };

  addPlaylist(newPlaylist);
}

for (let i = 1; i < 4; i++) {
  document
    .querySelector(`.platform-input .platform:nth-child(${i})`)
    .addEventListener("click", (event) => {
      selectedPlatform = document.querySelector(
        `.platform-input .platform:nth-child(${i})`
      ).id;

      for (let i = 1; i < 4; i++) {
        document
          .querySelector(`.platform-input .platform:nth-child(${i})`)
          .classList.remove("active");
      }
      document
        .querySelector(`.platform-input .platform:nth-child(${i})`)
        .classList.toggle("active");
    });
}

const sendPlaylist = () => {

  let tagArray;

  for (let o = 0; o < allTagLength; o++) {
    let tagElements = document.querySelectorAll(`.tags-input .tag`);
    tagArray = Array.from(tagElements);

    if (tagArray[o].classList.contains("active")) {
      selectedTagsIf.push(`${tagArray[o].id}`);
    }
  }

  if (5 > document.querySelector("#playlist-name").value.length || 16 < document.querySelector("#playlist-name").value.length) {
    Error = 'Playlist Name must (min 5 words, max 16 words)'
    showError()
    return
  }
  else if (document.querySelector("#playlist-link").value == "") {
    Error = 'Please enter currect Playlist Link'
    showError()
    return
  }
  else if (selectedPlatform == undefined) {
    Error = 'Please select currect Platform'
    showError()
    return
  }
  else if (30 > document.querySelector("#playlist-description").value.length || 150 < document.querySelector("#playlist-description").value.length) {
    Error = 'Playlist Description must (min 30 words, max 150 words)'
    showError()
    return
  }
  else if (3 > document.querySelector("#playlist-auther").value.length || 12 < document.querySelector("#playlist-auther").value.length) {
    Error = 'Playlist Auther must (min 3 words, max 12 words)'
    showError()
    return
  }
  else if (selectedTagsIf.length < 3) {
    Error = 'You need to select 3 tags minimum'
    showError()
    return
  }
  else{

    Error = 'Playlist added to website'
    showError()
  }

};

const showError = () => {
  errorCard.style.top = `${window.scrollY + (window.innerHeight - 100)}px`;
  errorCard.style.opacity = `1`;
  errorCard.innerHTML = `${Error}`

  if (Error == "Playlist added to website") {
    errorCard.style.borderLeft = "7px solid green";
    playlistDataOk()
  }

  setTimeout(() => {
    errorCard.style.opacity = `0`;
  }, 2000);

}
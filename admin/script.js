// const API
const usersAPI = (`API-LINK/USERS`)
const tagsAPI = (`API-LINK/TAGS`)
const topPlaylistAPI = (`API-LINK/TOP-PLAYLIST`)
const newPlaylistAPI = (`API-LINK/NEW-PLAYLIST`)
const allPlaylistAPI = (`API-LINK/PLAYLIST`)


const topGridContainer = document.querySelector(".top .grid-container");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");

let countID = 0;

let page = 1;
let limit = 16;
let allowLoading = true;
selectedTags = [];

//Trading Playlist
const getPlaylistAll = async () => {
  const result = await fetch(`${newPlaylistAPI}`);

  return result.json();
};

const getPlaylist = async () => {
  const result = await fetch(
    `${newPlaylistAPI}?_page=${page}&_limit=${limit}`
  );

  return result.json();
};

const showPlaylist = async () => {
  const getAllPlaylist = await getPlaylist();

  getAllPlaylist.forEach((post) => {
    const element = document.createElement("div");
    element.classList.add("grid-item");

    let tagMore = post.tags.length - 2;

    coverNum = 16;

    if (post.playlistcover !== "") {
      element.innerHTML = `
  
              <a href=""><img src="${post.playlistcover}" alt="Music Cover" class="cover-img"></a>
                      <a href=""><img src="../assets/image/${post.platform}.png" class="platform-icon"></a>
                      <p class="playlist-name">${post.playlistname}</p>
                      <i class="fa-solid fa-pen-to-square" onclick="showEdit('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}', '${post.platform}', '${post.id}')"></i>
                      <div class="tags-section">
                          <span class="tag">${post.tags[0]}</span>
                          <span class="tag">${post.tags[1]}</span>
                          <span class="tag">${tagMore}</span>
                      </div>
                      <div class="down">
                          <div class="description">
                              <p>${post.description}</p>
                          </div>
                          <div class="btn-box2">
                              <button class="btn1" onclick="addPlaylist('${post.id}')">Approve</button>
                              <button class="btn2" onclick="deletePlaylist('${post.id}')">Delete</button>
                          </div>
                      </div>
              
              `;
    } else {
      element.innerHTML = `
  
              <a href=""><img src="../assets/image/cover/16.jpg" alt="Music Cover" class="cover-img"></a>
                      <a href=""><img src="../assets/image/${post.platform}.png" class="platform-icon"></a>
                      <p class="playlist-name">${post.playlistname}</p>
                      <i class="fa-solid fa-pen-to-square" onclick="showEdit('${post.playlistcover}', '${post.playlistname}', '${post.description}', '${post.tags}', '${post.playlistlink}', '${post.platform}', '${post.id}')"></i>
                      <div class="tags-section">
                          <span class="tag">${post.tags[0]}</span>
                          <span class="tag">${post.tags[1]}</span>
                          <span class="tag">${tagMore}</span>
                      </div>
                      <div class="down">
                          <div class="description">
                              <p>${post.description}</p>
                          </div>
                          <div class="btn-box2">
                              <button class="btn1" onclick="addPlaylist('${post.id}')">Approve</button>
                              <button class="btn2" onclick="deletePlaylist('${post.id}')">Delete</button>
                          </div>
                      </div>
              
              `;
    }

    topGridContainer.appendChild(element);
  });
};

showPlaylist();

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
      const element = document.querySelectorAll(".trending .grid-container");
      if (element.length == countID) {
        allowLoading = false;
      } else {
        allowLoading = true;
        showLoading();
      }
    }
  });

  const showEdit = (
    playlistCover,
    playlistName,
    playlistDesc,
    playlistTag,
    playlistLink,
    playlistPlatform,
    playlistID,
  ) => {
    const edit = document.querySelector(".edit");
    const blackCover = document.querySelector(".black-cover");
  
    const playlistTags = playlistTag.split(",");
  
    if (playlistCover !== "") {
      edit.innerHTML = `
              <!-- Playlist Name -->
              <div class="playlistname edit-child">
                  <p class="input-title">Playlist Name :</p>
                  <input type="text" value="${playlistName}">
              </div>
              <!-- Playlist Link & Platform -->
              <div class="playlistlink edit-child">
                  <p class="input-title">Playlist Link :</p>
                  <div class="link-platform">
                      <img src="../assets/image/${playlistPlatform}.png" class="platform">
                      <input type="text" value="${playlistLink}">
                  </div>
              </div>
              <!-- Playlist Cover -->
              <div class="playlistcover edit-child">
                  <p class="input-title">Playlist Cover :</p>
                  <div class="link-platform">
                      <img src="${playlistCover}" class="cover">
                      <input type="text" value="${playlistCover}">
                  </div>
              </div>
              <!-- Playlist Tags -->
              <div class="playlisttags edit-child">
                  <p class="input-title">Playlist Tags :</p>
                  <span class="tags">
                  </span>
              </div>
              <!-- Playlist Des -->
              <div class="playlistname edit-child">
                  <p class="input-title">Playlist Description :</p>
                  <textarea name="" id="">${playlistDesc}</textarea>
              </div>
              <!-- Btn -->
              <div class="btn-box3">
                  <button class="btn1 btnw" onclick="addPlaylist('${playlistID}')s">Approve</button>
                  <button class="btn2 btnw" onclick="deletePlaylist('${playlistID}')">Delete</button>
              </div>
          `;
    } else {
      edit.innerHTML = `
  
        <!-- Playlist Name -->
        <div class="playlistname edit-child">
            <p class="input-title">Playlist Name :</p>
            <input type="text" value="${playlistName}">
        </div>
        <!-- Playlist Link & Platform -->
        <div class="playlistlink edit-child">
            <p class="input-title">Playlist Link :</p>
            <div class="link-platform">
                <img src="../assets/image/${playlistplatform}.png" class="platform">
                <input type="text" value="${playlistLink}">
            </div>
        </div>
        <!-- Playlist Cover -->
        <div class="playlistcover edit-child">
            <p class="input-title">Playlist Cover :</p>
            <div class="link-platform">
                <img src="${playlistCover}" class="cover">
                <input type="text" value="${playlistCover}">
            </div>
        </div>
        <!-- Playlist Tags -->
        <div class="playlisttags edit-child">
            <p class="input-title">Playlist Tags :</p>
            <span class="tags">d
            </span>
        </div>
        <!-- Playlist Des -->
        <div class="playlistname edit-child">
            <p class="input-title">Playlist Description :</p>
            <textarea name="" id="">${playlistDesc}</textarea>
        </div>
        <!-- Btn -->
        <div class="btn-box3">
            <button class="btn1 btnw" onclick="addPlaylist('${playlistID}')">Approve</button>
            <button class="btn2 btnw" onclick="deletePlaylist('${playlistID}')">Delete</button>
        </div>
      
      `;
    }
  
    const tags = document.querySelector(".edit .playlisttags .tags");
  
    for (let i = 0; i < playlistTags.length; i++) {
      const elTag = document.createElement("span");
      elTag.classList.add("tag");
  
      elTag.innerHTML = `${playlistTags[i]}`;
  
      tags.appendChild(elTag);
    }
  
    document.body.classList.add("remove-scrolling");
    blackCover.style.visibility = "visible";
    edit.style.display = "block";
    blackCover.style.top = `${window.scrollY}px`;
    edit.style.top = `${window.scrollY + window.innerHeight / 2}px`;
  };
  
const closeBtn = () => {
  const edit = document.querySelector(".edit");
  const blackCover = document.querySelector(".black-cover");

  document.body.classList.remove("remove-scrolling");
  blackCover.style.visibility = "hidden";
  edit.style.display = "none";
};

const getPlaylistWithID = async (id) => {
  const result = await fetch(`${newPlaylistAPI}/${id}`);

  return result.json();
};

async function sendPlaylist(obj, id) {
  await fetch("${allPlaylistAPI}", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  deletePlaylist(`${id}`)
}

const deletePlaylist = async (id) => {
  await fetch(`${newPlaylistAPI}/${id}`, {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: id}),
  });
  topGridContainer.innerHTML= ``;
  showPlaylist()
};

const addPlaylist = async (id) => {
  getCountID();
  const getPlaylist = await getPlaylistWithID(id);

  selectedTags = getPlaylist.tags.toString().split(",")

  const newPlaylist = {
    id: `${countID + 1}`,
    playlistname: `${getPlaylist.playlistname}`,
    playlistlink: `${getPlaylist.playlistlink}`,
    playlistcover: `${getPlaylist.playlistcover}`,
    playlistauther: `${getPlaylist.playlistauther}`,
    description: `${getPlaylist.description}`,
    platform: `${getPlaylist.platform}`,
    tags: selectedTags,
  };
  sendPlaylist(newPlaylist, `${id}`);
}

const getUsers = async () => {
  const result = await fetch(
    `${usersAPI}`
  );

  return result.json();
};

const checkLogin = () => {
  const userInput = document.querySelector('#user');
  const passwordInput = document.querySelector('#password');
  const USER = document.querySelector('#user').value
  const PASSWORD = document.querySelector('#password').value

  userInput.style.border = "2px solid #000"
  passwordInput.style.border = "2px solid #000"

  const checkUSER = async () => {
    const getAllUsers = await getUsers()
    getAllUsers.every(function(post, index) {
      const okUSER = post.username
      const okPASSWORD = post.password

      if (USER === okUSER) {
        userInput.style.border = "2px solid green"
        if (PASSWORD === okPASSWORD) {
          const topSection = document.querySelector('.admin-section')
          const loginForm = document.querySelector('.login-form')
          topSection.style.display = "block"
          loginForm.style.display = "none"
        return false
        }
        else{
          Error = 'Wrong Password!'
          ShowError()
          return false
        }
        
      }
      else{
        Error = 'Username undefined!'
        ShowError()
        return true
      }
     
    })
  }
  checkUSER()
}

const ShowError = () => {
  const errorCard = document.querySelector('.error');
  const userInput = document.querySelector('#user');
  const passwordInput = document.querySelector('#password');
  errorCard.innerHTML= `${Error}`
  errorCard.style.display = "block"
  if (Error === 'Wrong Password!') {
    passwordInput.style.border = "2px solid red"
  }
  else{
    userInput.style.border = "2px solid red"
    passwordInput.style.border = "2px solid red"
  }

  setTimeout(() => {
    errorCard.style.display = "none"
  }, 1500);
}
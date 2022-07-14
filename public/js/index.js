const burger = document.querySelector("#burger");
burger.addEventListener("click", () => {
  hamburgerMenu();
});
// Headerbanner x
const headerbannerX = document.querySelector("#headerbannerx");
headerbannerX.addEventListener("click", () => {
  const headerbanner = document.querySelector("#headerbanner");
  headerbanner.classList.add("hidden");
});

function hamburgerMenu() {
  // menu toggle
  const menu = document.querySelector("#mobile-menu");
  if (menu.classList.contains("sm:hidden")) {
    menu.classList.remove("sm:hidden");
    menu.classList.add("hidden");
  } else {
    menu.classList.remove("hidden");
    menu.classList.add("sm:hidden");
  }
  // hamberger menu toggle
  if (burger.children[0].children[1].classList.contains("hidden")) {
    burger.children[0].children[1].classList.remove("hidden");
    burger.children[0].children[1].classList.add("block");
    burger.children[0].children[2].classList.remove("block");
    burger.children[0].children[2].classList.add("hidden");
  } else {
    burger.children[0].children[1].classList.remove("block");
    burger.children[0].children[1].classList.add("hidden");
    burger.children[0].children[2].classList.remove("hidden");
    burger.children[0].children[2].classList.add("block");
  }
}

// function copy() {
//   let copyText = document.querySelector("#shortUrl");
//   const copyIcon = document.querySelector("#copyicon");
//   const copyDoneIcon = document.querySelector("#copydoneicon");
//   const toastMessage = document.querySelector("#toastmessage");
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); /* For mobile devices */
//   navigator.clipboard.writeText(copyText.value);
//   copyIcon.classList.add("hidden");
//   copyDoneIcon.classList.remove("hidden");
//   toastMessage.classList.add("show");
//   setTimeout(() => {
//     copyIcon.classList.remove("hidden");
//     copyDoneIcon.classList.add("hidden");
//     toastMessage.classList.remove("show");
//   }, 2000);
// }


// xhr request to get short urls
const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getShortUrl();
});

function getShortUrl() {
  const formData = new FormData(form);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "longUrl": formData.get('longUrl') })
  })
    .then(res => res.json())
    .then(data => {
      const shortUrl = document.querySelector('#shortUrl');
      shortUrl.value = data.shortUrl;
      const shortUrlDiv = document.querySelector('#shortUrlDiv');
      shortUrlDiv.classList.remove("hidden");
      // calling handleLocalStorage function
      handleLocalStorage(data);
    })
    .catch(err => console.log(err));
}

function handleLocalStorage(data) {
  const longUrl = document.querySelector('#longUrl');
  let localUrls = [];
  if (localStorage.getItem("urls") != null) {
    localUrls = JSON.parse(localStorage.getItem("urls"));
  }
  localUrls.push({
    "id": localUrls.length,
    "longUrl": longUrl.value,
    "shortUrl": data.shortUrl,
  });
  localStorage.setItem("urls", JSON.stringify(localUrls));
  // calling handleRecentUrls function
  handleRecentUrls();
}

function handleRecentUrls() {
  if (localStorage.getItem("urls") !== null) {
    let urls = JSON.parse(localStorage.getItem("urls"));
    let recentUrlContainer = document.querySelector('#recent-url-container');
    recentUrlContainer.classList.remove("hidden");
    let recentUrls = document.querySelector('#recent-urls');
    if (recentUrls.hasChildNodes) {
      while (recentUrls.childNodes.length) {
        recentUrls.removeChild(recentUrls.firstChild);
      }
    }
    let recentUrlsList = document.createElement('ul');
    recentUrlsList.classList.add('list-none');
    recentUrls.appendChild(recentUrlsList);
    urls.forEach(url => {
      let recentUrlsListItem = document.createElement('li');
      recentUrlsListItem.classList.add('list-none__item');
      recentUrlsList.appendChild(recentUrlsListItem);
      let recentUrlsListItemUrl = document.createElement('p');
      recentUrlsListItemUrl.innerHTML = url.longUrl;
      recentUrlsListItem.appendChild(recentUrlsListItemUrl);
      let recentUrlsListItemLink = document.createElement('a');
      recentUrlsListItemLink.href = url.shortUrl;
      recentUrlsListItemLink.innerHTML = url.shortUrl;
      recentUrlsListItem.appendChild(recentUrlsListItemLink);
    });
  }
}

handleRecentUrls();
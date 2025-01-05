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
      const urlField = document.querySelector('#longUrl');
      urlField.value = data.shortUrl;
      urlField.style.color = "#059669";
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

// function handleRecentUrls() {
//   if (localStorage.getItem("urls") !== null) {
//     let urls = JSON.parse(localStorage.getItem("urls"));
//     let recentUrlContainer = document.querySelector('#recent-url-container');
//     recentUrlContainer.classList.remove("hidden");
//     let recentUrls = document.querySelector('#recent-urls');
//     if (recentUrls.hasChildNodes) {
//       while (recentUrls.childNodes.length) {
//         recentUrls.removeChild(recentUrls.firstChild);
//       }
//     }
//     let recentUrlsList = document.createElement('ul');
//     recentUrlsList.classList.add('list-none');
//     recentUrls.appendChild(recentUrlsList);
//     urls.forEach(url => {
//       let recentUrlsListItem = document.createElement('li');
//       recentUrlsListItem.classList.add('list-none__item');
//       recentUrlsList.appendChild(recentUrlsListItem);

//       // appending elements to list item
//       let recentUrlsListItemTitle = document.createElement('h3');
//       recentUrlsListItemTitle.innerHTML = url.title || "No title";
//       recentUrlsListItem.appendChild(recentUrlsListItemTitle);

//       let recentUrlsListItemLink = document.createElement('a');
//       recentUrlsListItemLink.href = url.shortUrl;
//       recentUrlsListItemLink.innerHTML = url.shortUrl;
//       recentUrlsListItem.appendChild(recentUrlsListItemLink);

//       let recentUrlsListItemUrl = document.createElement('p');
//       recentUrlsListItemUrl.innerHTML = url.longUrl;
//       recentUrlsListItem.appendChild(recentUrlsListItemUrl);

//     });
//   }
// }

function handleRecentUrls() {
  if (localStorage.getItem("urls") !== null) {
    let urls = JSON.parse(localStorage.getItem("urls"));
    let recentUrlContainer = document.querySelector('#recent-url-container');
    recentUrlContainer.classList.remove("hidden");
    let recentUrls = document.querySelector('#recent-urls');

    // Clear existing child nodes
    while (recentUrls.firstChild) {
      recentUrls.removeChild(recentUrls.firstChild);
    }

    // Render only one URL in the form container
    if (urls.length > 0) {
      let firstUrl = urls[urls.length - 1]; // Display the most recent URL
      let listItem = createUrlListItem(firstUrl);
      recentUrls.appendChild(listItem);
    }
  }
}

// Helper function to create a URL list item
function createUrlListItem(url) {
  let listItem = document.createElement('div');
  listItem.classList.add('list-none__item');
  let title = document.createElement('h3');
  title.innerHTML = url.title || "No title";
  listItem.appendChild(title);

  let link = document.createElement('a');
  link.href = url.shortUrl;
  link.innerHTML = url.shortUrl;
  listItem.appendChild(link);

  let longUrl = document.createElement('p');
  longUrl.innerHTML = url.longUrl;
  listItem.appendChild(longUrl);

  return listItem;
}

// Handle "See More" link click
document.querySelector('#seeMoreLink').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default link behavior

  if (localStorage.getItem("urls") !== null) {
    let urls = JSON.parse(localStorage.getItem("urls")).reverse(); // Reverse the order

    let popover = document.createElement('div');
    popover.classList.add('fixed', 'inset-0', 'bg-gray-800', 'bg-opacity-75', 'flex', 'justify-center', 'items-center', 'z-50');

    let content = document.createElement('div');
    content.classList.add('bg-white', 'p-6', 'rounded', 'shadow-lg', 'w-96', 'max-h-[75vh]', 'overflow-y-auto', 'relative');
    popover.appendChild(content);

    // Close button
    let closeBtn = document.createElement('button');
    closeBtn.classList.add('absolute', 'top-2', 'right-2', 'text-gray-400', 'hover:text-gray-600', 'font-bold', 'text-lg');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => document.body.removeChild(popover);
    content.appendChild(closeBtn);

    // Render URLs in reverse order
    let urlList = document.createElement('ul');
    urlList.classList.add('list-none');

    urls.forEach(url => {
      let listItem = createUrlListItem(url);
      urlList.appendChild(listItem);
    });
    content.appendChild(urlList);

    document.body.appendChild(popover);
  }
});



handleRecentUrls();
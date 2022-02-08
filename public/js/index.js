const burger = document.querySelector("#burger");
const menu = document.querySelector("#mobile-menu");
const headerbannerX = document.querySelector("#headerbannerx");
const headerbanner = document.querySelector("#headerbanner");

burger.addEventListener("click", () => {
  // menu toggle
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
});

// Headerbanner x
headerbannerX.addEventListener("click", () => {
  headerbanner.classList.add("hidden");
});

// xhr form request
const form = document.querySelector('#myForm');
const shortUrl = document.querySelector('#shortUrl');
const shortUrlDiv = document.querySelector('#shortUrlDiv');

form.addEventListener('submit', (e) => {
  const data = new FormData(form);
  e.preventDefault();
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        "longUrl": data.get('longUrl')
      }
    )
  })
    .then(res => res.json())

    .then(data => {
      shortUrl.value = data.shortUrl;
      shortUrlDiv.classList.remove("hidden");
      let count = localStorage.getItem('count');
      count++;
      localStorage.setItem('count', count);
      localStorage.setItem(count, data.shortUrl);
    })

    .catch(err => console.log(err));
}
);

function copy() {
  let copyText = document.querySelector("#shortUrl");
  const copyIcon = document.querySelector("#copyicon");
  const copyDoneIcon = document.querySelector("#copydoneicon");
  const toastMessage = document.querySelector("#toastmessage");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  copyIcon.classList.add("hidden");
  copyDoneIcon.classList.remove("hidden");
  toastMessage.classList.add("show");
  setTimeout(() => {
    copyIcon.classList.remove("hidden");
    copyDoneIcon.classList.add("hidden");
    toastMessage.classList.remove("show");
  }, 2000);
}

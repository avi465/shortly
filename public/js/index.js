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
    .then(data => shortUrl.value = data.shortUrl)
    .catch(err => console.log(err));
}
);


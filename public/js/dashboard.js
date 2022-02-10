// copy texts to clipboard
function copy() {
  let copyText = document.querySelector("#copy");
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

// profile toggle
const profile = document.querySelector("#profile");
profile.addEventListener("click", () => {
  if (profile.firstElementChild.classList.contains("hidden")) {
    profile.firstElementChild.classList.remove("hidden");
    profile.firstElementChild.classList.add("visible");
  } else {
    profile.firstElementChild.classList.add("hidden");
    profile.firstElementChild.classList.remove("visible");
  }
});

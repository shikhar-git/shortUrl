const advanced = document.querySelector(".advanceInfo");
const inputUrl = document.querySelector(".inputUrl");
const shorten = document.querySelector(".btn-shorten");
const Small = document.querySelector("small");
shorten.addEventListener("click", addhandler);
function addhandler() {
  console.log(inputUrl);
  console.log(Small);
  if (!inputUrl.value) {
    Small.style.display = "block";
    inputUrl.classList.toggle("wrong");
    return;
  }
  inputUrl.classList.remove("wrong");
  Small.style.display = "none";
  const val = inputUrl.value;
  inputUrl.value = "";
  shortenUrl(val);
}
const shortenUrl = async (val) => {
  try {
    const url = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: "Bearer 9a0d6794447afbd35a4fd445c802a11d9f4b8211",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_url: val, domain: "bit.ly" }),
    });
    const res = await url.json();
    const short_link = res.id;
    console.log(short_link);
    render(short_link, val);
  } catch (err) {
    console.log(err);
  }
};
const changeText = async () => {
  const copy = document.querySelector(".copy");
  const short = document.querySelector(".result");
  copy.innerHTML = "copied!";
  console.log(short.innerHTML); 
  try {
    await navigator.clipboard.writeText(short.innerHTML)
    copy.classList.toggle("copied");
  } catch (err) {
    console.error('Failed to copy!', err)
  }
};
const render = (short_link, val) => {
  const html = `
    <div class="results">
    <div class="givenUrl">${val.slice(0, 30)}...</div>
    <div class="wrap">
    <div class="result">${short_link}</div>
    <button class="btn btn-copy copy" onclick="changeText()">Copy</button>
    </div>
    </div>
    `;
  advanced.insertAdjacentHTML("beforeend", html);
};

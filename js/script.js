// Select overview div - where profile information wil appear
const overview = document.querySelector(".overview");
const username = "nikkinbird";

// Async function to fetch data from github profile
const getData = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );

    const data = await res.json();
    console.log(data);
    displayUserInfo(data);
};

getData();

// Function to display fetched user data
const displayUserInfo = function(data) {
    let userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = 
  `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`
  overview.append(userInfo);
}
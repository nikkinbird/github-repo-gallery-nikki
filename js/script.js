// Select overview div - where profile information will appear
const overview = document.querySelector(".overview");
const username = "nikkinbird";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewRepos = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


// ***************** Fetch User Data ******************
// Async function to fetch data from github profile
const getData = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );

    const data = await res.json();
    //console.log(data);
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


// ************** Fetch List of User Repos ********/

// Function to fetch repos
const fetchRepos = async function() {
    const res = await fetch (
        `https://api.github.com/users/${username}/repos`
    );

    const repos = await res.json();
    //console.log(repos);
    displayRepos(repos);
}

fetchRepos();


// Function to display repos
const displayRepos = function(repos) {
    filterInput.classList.remove("hide");
    repos.forEach(function (repo) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    });
    
}

// *********** Display Info for Indiv. Repos ******** 

// Event listener for repo-list
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// Function to get specific repo info
const getRepoInfo = async function(repoName) {
    const res = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await res.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (
        repoInfo.languages_url
    );
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];

    for(let language in languageData) {
        languages.push(language);
    }

    //console.log(languages);

    displayRepoInfo(repoInfo, languages);
}

// Function to display specific repo info
const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = 
    `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `  ;
    
    repoData.append(repoDiv);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    viewRepos.classList.remove("hide");
}  

// Click event for back button
viewRepos.addEventListener("click", function() {
    repoData.classList.add("hide");
    repoSection.classList.remove("hide");
    viewRepos.classList.add("hide");
});

// Filter input event listener
filterInput.addEventListener("input", function(e) {
    const searchInput = e.target.value;
    //console.log(searchInput);
    const repos = document.querySelectorAll(".repo");
    //console.log(repos);
    const lowerCaseInput = searchInput.toLowerCase();
    repos.forEach(function (repo) {
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (lowerCaseRepo.includes(lowerCaseInput)) {
            repo.classList.remove("hide");
        } else repo.classList.add("hide");
    })

})
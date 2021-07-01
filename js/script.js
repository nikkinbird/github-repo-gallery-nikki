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
};

getData();
// index.js

document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "https://api.github.com";
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

    githubForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = searchInput.value;

        // Search for users
        fetch(`${baseURL}/search/users?q=${username}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Display search results
            displayUsers(data.items);
        })
        .catch(error => console.error("Error:", error));
    });

    function displayUsers(users) {
        // Clear previous results
        userList.innerHTML = "";
        reposList.innerHTML = "";

        // Display user information
        users.forEach(user => {
            const userItem = document.createElement("li");
            userItem.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" alt="${user.login} avatar">
                <a href="${user.html_url}" target="_blank">View Profile</a>
                <button onclick="getUserRepos('${user.login}')">View Repositories</button>
            `;
            userList.appendChild(userItem);
        });
    }

    function getUserRepos(username) {
        // Fetch user repositories
        fetch(`${baseURL}/users/${username}/repos`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Display user repositories
            displayRepos(data);
        })
        .catch(error => console.error("Error:", error));
    }

    function displayRepos(repos) {
        // Clear previous results
        reposList.innerHTML = "";

        // Display repository information
        repos.forEach(repo => {
            const repoItem = document.createElement("li");
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available"}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            reposList.appendChild(repoItem);
        });
    }
});

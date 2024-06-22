async function getUsers() {
    const userName = document.getElementById('UserName').value;
    const url = `https://api.github.com/users/${userName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response not ok: " + response.statusText);
        }
        const user = await response.json();
        showUsers(user);
        document.body.classList.remove('initial'); 
        document.body.classList.add('searched');
        document.getElementById("searchImage").style.display = 'none'; 
    } catch (error) {
        console.error("Возникла ошибка", error);
        document.getElementById('result').innerHTML = `<p>Серверден жооп жок</p>`;
    }
}

function showUsers(user) {
    document.getElementById('result').innerHTML = `
    <div class="card" style="width: 18rem; border: 2px solid blue;">
        <img src="${user.avatar_url}" class="card-img-top small-image" alt="...">
        <div class="card-body">
            <h5 class="card-title" style="font-size: 24px">${user.login}</h5>
            <p class="card-text">${user.bio}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Name: ${user.name}</li>
            <li class="list-group-item">Repositories: ${user.public_repos}</li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Created at: ${user.created_at}</li>
            <li class="list-group-item">Followers: ${user.followers}</li>
        </ul>
        <div class="card-body">
            <a href="${user.html_url}" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
    </div>
    `;
}
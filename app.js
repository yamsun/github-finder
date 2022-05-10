const btn = document.querySelector("button");
const input = document.querySelector("input");
const fullName = document.querySelector("#name")
const userDetailDiv = document.querySelector("#user-detail")
const userImg = document.querySelector("#img")
const publicRepos = document.querySelector("#public-repos")
const company = document.querySelector("#company")
const userLocation = document.querySelector("#location")
const profileLink = document.querySelector("#profile-link")
const bio = document.querySelector("#bio")
const followers = document.querySelector("#followers")
const otherDetails = document.querySelector("#other-details")
const repoList = document.querySelector("#repo-list")


btn.addEventListener("click", btnHandler);


function btnHandler() {
    const userName = input.value;
    fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then(githubUser => {
            showUserDetails(githubUser)
        })
        .catch(error => console.log(error.message))
}

function showUserDetails(githubUser){
    fullName.innerHTML = githubUser.name;
    userImg.innerHTML = `<img src=${githubUser.avatar_url} width="250px"/>`
    publicRepos.innerHTML=`<p>Total Public Repos: ${githubUser.public_repos}</p>`
    company.innerHTML=githubUser.company && `<p>Company: ${githubUser.company}</p>`
    userLocation.innerHTML=githubUser.location && `<p>Location: ${githubUser.location}</p>`
    profileLink.innerHTML=`<a href=${githubUser.html_url} target="a" > <h4>Visit Profile</h4> </a>`
    bio.innerHTML = githubUser.bio&&`<p>${githubUser.bio}</p>`
    followers.innerHTML = `<p>Followers: ${githubUser.followers}</p>`
    otherDetails.innerHTML= `<button id="view-all-repos" > List All Repos </button>`
}

document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'view-all-repos'){
        viewAllRepos()
     }
 });

function viewAllRepos(){
    const userName = input.value;
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => response.json())
        .then(allRepos => {
            showRepos(allRepos)
        })
    }
    function showRepos(allRepos){
        allRepos.forEach(element => {
            // console.log(element.name)
            // console.log(element.html_url)
            // console.log(element.description)

            document.getElementById("view-all-repos").scrollIntoView({behavior: 'smooth'});
       
            otherDetails.innerHTML += `<a href=${element.html_url} target="a"> <h4>${element.name}</h4> </a> `
    });
}
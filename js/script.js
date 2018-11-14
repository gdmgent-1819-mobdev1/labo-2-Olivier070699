function data(){
    fetch('https://randomuser.me/api?results=10')
    .then(function(response) {
    return response.json();
    })
  .then(function(myJson) {
    localStorage.setItem('testObject', JSON.stringify(myJson));
        
    });
};

//Laden
data();

//Nieuw profiel laden
let nul=0;
let active = '';
function nextProfile(){
    let newPerson = JSON.parse(localStorage.getItem('testObject'));
    active = newPerson.results[nul];
    showProfile(active);
    console.log(active.name);
    console.log(nul);
    if(nul>=9){
        nul=0;
        data();
    }else{
        nul++;
    }
};

// NIEUW PROFIEL TONEN
function showProfile(gegevens){
let img = document.createElement('img');
img.src = gegevens.picture.large;
document.getElementById('div').innerHTML = '<img src="' + gegevens.picture.large + '" >';

let showFName = gegevens.name.first;
let showLName = gegevens.name.last;
let fullName = showFName + ' ' + showLName;
document.getElementById('name').innerHTML = showFName + ' ' + showLName;

let showAge = gegevens.dob.age;
document.getElementById('age').innerHTML = 'Age: ' + showAge;

let showLocation = gegevens.location.city;
document.getElementById('place').innerHTML = showLocation;
};

nextProfile();

let likes = new Array();
let dislikes = new Array();


// LIKE
function like(){
    likes.push(active.name.first + ' ' + active.name.last);
    console.log('You like: ' + likes);
    localStorage.setItem('LIKES', JSON.stringify(likes));
    nextProfile();
    seeLikes();
};
//DISLIKE
function dislike(){
    dislikes.push(active.name.first + ' ' + active.name.last);
    console.log('You dislike: ' + dislikes);
    localStorage.setItem('DISLIKE', JSON.stringify(dislikes));
    nextProfile();
    seeDislikes();
};

// seeLikes
function seeLikes(){
    document.getElementById('likeList').innerHTML = "";
    for (let i = 0; i < likes.length; i++) {
        document.getElementById('likeList').innerHTML += "<li class='li_likes' id='" + i + "'>" + likes[i] + "</li>";
    }
    renderEvtListeners();
};

// seeDislikes
function seeDislikes(){
    document.getElementById('dislikeList').innerHTML = "";
    for (let i = 0; i < dislikes.length; i++) {
        document.getElementById('dislikeList').innerHTML += "<li class='li_dislikes' id='" + i + "'>" + dislikes[i] + "</li>";
    }
    renderEvtListeners();
};

//Like to dislike
function renderEvtListeners(){
    let li_likes = document.getElementsByClassName("li_likes");
    for (let i = 0; i < li_likes.length; i++) {
        li_likes[i].addEventListener("click", toDislike);
    }

    let li_dislikes = document.getElementsByClassName("li_dislikes");
    for (let i = 0; i < li_dislikes.length; i++) {
        li_dislikes[i].addEventListener("click", toLike);
    }
}

function toDislike(e){
    console.log('LIKEDEBUG: ' + e.currentTarget.id);
    dislikes.push(likes[e.currentTarget.id]);
    likes.splice(e.currentTarget.id, 1);
    seeDislikes();
    seeLikes();
}

function toLike(e){
    console.log('DISLIKEDEBUG: ' + e.currentTarget.id);
    likes.push(dislikes[e.currentTarget.id]);
    dislikes.splice(e.currentTarget.id, 1);
    seeDislikes();
    seeLikes();
}
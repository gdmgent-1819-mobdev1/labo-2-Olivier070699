function data(){
	fetch('https://randomuser.me/api?results=10')
  	.then(function(response) {
    return response.json();
	})
  .then(function(myJson) {
    // console.log(JSON.stringify(myJson));
    localStorage.setItem('testObject', JSON.stringify(myJson));
	});
};

//Nieuw profiel tonen
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

//LIKE
function like(){
	likes.push(active.name.first + ' ' + active.name.last);
	console.log('You like: ' + likes);
	localStorage.setItem('LIKES', JSON.stringify(likes));
	nextProfile();		
}
//DISLIKE
function dislike(){
	dislikes.push(active.name.first + ' ' + active.name.last);
	console.log('You dislike: ' + dislikes);
	localStorage.setItem('DISLIKE', JSON.stringify(dislikes));
	nextProfile();	
};

//SEE LIKES
function seeLikes(){
	let showLikeNames = localStorage.getItem('LIKES', JSON.stringify(likes));
	document.getElementById('likeList').innerHTML = showLikeNames;
};

//SEE DISLIKES
function seeDislikes(){
	let showDislikeNames = localStorage.getItem('DISLIKE', JSON.stringify(likes));
	document.getElementById('dislikelist').innerHTML = showDislikeNames;
};

data();

















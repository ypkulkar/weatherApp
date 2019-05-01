let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var
let imageIndex = 0;
let imageHalt = 0;


function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;
		if (count >= 10) {
            createImgTags();
            let timer = setInterval(displayImages,200);
            
            //displayImages();
        }
    }
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		addToArray(newImage);
	}
	newImage.onerror = function() {
	}
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}

}

getTenImages();

function createImgTags(){
    const con = document.querySelector("#doppler-images");

    let img = document.createElement("img");
    img.id = "doppler-cities";
    img.alt = "Doppler Cities";
    img.classList.add("doppler-img-size");
    img.src = "http://radar.weather.gov/ridge/Overlays/Cities/Short/DAX_City_Short.gif";
    
    for(let i = 0; i < 10; i++){
        let img = document.createElement("img");
        img.id = `doppler-${i}`;
        img.src = imageArray[i].src;
        img.alt = `Doppler Image ${i}`;
        img.style.opacity = 0.5;
        img.classList.add("doppler-img-size");
        img.style.position = "absolute";
        if(i == 0){
            img.style.display = "flex";
        }
        else{
            img.style.display = "none";
        }
        con.appendChild(img);
    }
    
    con.appendChild(img);
    

}

function displayImages(){

    const currImg = document.querySelector(`#doppler-${imageIndex}`);
    const nextImg = document.querySelector(`#doppler-${(imageIndex + 1)%10}`);
    currImg.style.display = "none";
    nextImg.style.display = "flex";

    if(imageIndex == 9 && imageHalt != 2){
        imageHalt++;
        return;
    }
    imageHalt = 0;

    imageIndex = (imageIndex + 1)%10;
    
}

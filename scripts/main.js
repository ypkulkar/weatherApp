"strict mode";

var object;
var today = new Date();

const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click",function(){
   xhr = makeCorsRequest();
   xhr.onreadystatechange = orscFunction;
});

orscFunction = function(){
    if(xhr.readyState == 4){ // Request is done
        if(xhr.status == 200){ // Everything is smooth
            object = JSON.parse(xhr.responseText);
            if(!checkDist(object)){
                alert("Not Found");
            }
            else{
                updateScreen(object);
            }
        }
        if(xhr.status == 404){
            console.log("Not found");
            alert("Not Found");
        }
    }
};

xhr = makeCorsRequest();
xhr.onreadystatechange = orscFunction;



var upper = document.querySelector("#upper");
var lower = document.querySelector("#lower");

const upArrow = document.querySelector("#up-arrow");
upArrow.addEventListener("click",slideUp);

const downArrow = document.querySelector("#down-arrow");
downArrow.addEventListener("click",slideDown);


function slideUp(){
    upper.classList.remove('slideDownAnimation');
    upper.classList.add('slideUpAnimation');
}

function slideDown(){
    upper.classList.remove('slideUpAnimation');
    upper.classList.add('slideDownAnimation');
}

let tabWidth = window.matchMedia("(min-width: 500px)");
tabWidth.addListener(setDisplay);

function setDisplay(){
    if(tabWidth.matches){
        upper.classList.remove('slideUpAnimation');
        upper.classList.remove('slideDownAnimation');
    }
}


/* -------- Helper Functions ----------- */


function updateScreen(obj){
    let curr_time = obj.list[0].dt_txt.split(" ")[1].split(":")[0] - 7;
    curr_time = (curr_time < 0) ? curr_time += 24 : curr_time;

    //Update current weather
    const currentTemp = document.querySelector("#temp0");
    currentTemp.textContent = Math.floor(obj.list[0].main.temp);

    const currentTime = document.querySelector("#main-time");
    currentTime.textContent = getTimeStr(curr_time);

    const currentIcon = document.querySelector("#current-icon");
    currentIcon.src = getImgUrl(obj.list[0].weather[0].icon);

    //Update future weather
    for(let i = 1; i < 6; i++){
        let futureTemp = document.querySelector(`#temp${i}`);
        futureTemp.textContent = Math.floor(obj.list[i].main.temp);

        let futureTime = document.querySelector(`#time${i}`);
        futureTime.textContent = getTimeStrFuture(curr_time + i);

        let futureIcon = document.querySelector(`#icon${i}`);
        futureIcon.src = getImgUrl(obj.list[i].weather[0].icon);   
    }
}

function getTimeStr(tm){
    tm = tm % 24;
    let str = "";

    if(tm == 0){
        str = "12AM";
    } else if(tm == 12){
        str = "12PM";
    } else{
        const ampm = (tm > 12)?"PM":"AM";
        str = `${tm%12}${ampm}`;
    }

    return str;
}

function getTimeStrFuture(tm){
    tm = tm % 24;
    let str = "";

    if(tm == 0){
        str = "12:00 am";
    } else if(tm == 12){
        str = "12:00 pm";
    } else{
        const ampm = (tm > 12)?"pm":"am";
        str = `${tm%12}:00 ${ampm}`;
    }

    return str;
}

function getImgUrl(iconId){
    let imgUrl = "";

    switch(iconId){
        case "01d":
            imgUrl = "assets/img/clearsky.svg";
            break;
        case "01n":
            imgUrl = "assets/img/clear-night.svg";
            break;
        case "02d":
            imgUrl = "assets/img/fewclouds-day.svg";
            break;
        case "02n":
            imgUrl = "assets/img/fewclouds-night.svg";
            break;
        case "03d":          
        case "03n":
            imgUrl = "assets/img/scatteredclouds.svg";
            break;
        case "04d":
        case "04n":
            imgUrl = "assets/img/brokencloud.svg";
            break;
        case "09d":
        case "09n":
            imgUrl = "assets/img/showerrain.svg";
            break;
        case "10d":
            imgUrl = "assets/img/rain-day.svg";
            break;
        case "10n":
            imgUrl = "assets/img/rain-night.svg";
            break;
        case "11d":
        case "11n":
            imgUrl = "assets/img/thunderstorms.svg";
            break;
        case "13d":
        case "13n":
            imgUrl = "assets/img/snow.svg";
            break;
        case "50d":
        case "50n":
            imgUrl = "assets/img/mist.svg";
            break;
    }
    return imgUrl;
}

function checkDist(obj){
    let lat1 = obj.city.coord["lat"];
    let lon1 = obj.city.coord["lon"];
    let lat2 = 38.5449;
    let lon2 = -121.7405;
    let dist = getDistInMiles(lat1,lon1,lat2,lon2);
    let ret = (dist < 151)?true:false;
    return ret;
}


// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistInMiles(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    d = d * 0.62137119; // Distance in miles
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  

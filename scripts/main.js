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
            //printDisplay(object);
            updateScreen(object);
            //console.log(object);
        }
        if(xhr.status == 404){
            console.log("Not found");
        }
    }
};

xhr = makeCorsRequest();
xhr.onreadystatechange = orscFunction;





/* -------------------------------- Helper Functions ---------------------------------------- */

function printDisplay(obj){
    console.log(`City: ${obj.city.name}`);
    console.log(`Current: ${(today.getHours())%12}`);
    console.log(`Temp: ${obj.list[0].main.temp}`);
    console.log(`Icon: ${obj.list[0].weather[0].description}`)
    console.log("-------");
    for(let i = 1; i < 6; i++){
        console.log(`Hour${i}: ${((today.getHours()+i)%12 == 0)?12:(today.getHours()+i)%12}`)
    }
}

function updateScreen(obj){
    //Get time using the object
    let curr_time = obj.list[0].dt_txt.split(" ")[1].split(":")[0] - 7;
    curr_time = (curr_time < 0) ? curr_time += 24 : curr_time;

    //Update current weather
    const currentTemp = document.querySelector("#current-temp");
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
        futureTime.textContent = getTimeStr(curr_time + i);

        let futureIcon = document.querySelector(`#icon${i}`);
        futureIcon.src = getImgUrl(obj.list[i].weather[0].icon);
        
    }


}

function getTimeStr(tm){
    tm = tm % 24;
    let str = "";

    if(tm == 0){
        str = "12 AM";
    } else if(tm == 12){
        str = "12 PM";
    } else{
        const ampm = (tm > 12)?"PM":"AM";
        str = `${tm%12} ${ampm}`;
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


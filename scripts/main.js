"strict mode";

var object;
var today = new Date();

const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click",function(){
  //cityName = chooseCity.value;
   xhr = makeCorsRequest();
   xhr.onreadystatechange = orscFunction;
});

orscFunction = function(){
    if(xhr.readyState == 4){ // Request is done
        if(xhr.status == 200){ // Everything is smooth
            object = JSON.parse(xhr.responseText);
            //console.log(object);
            printDisplay(object);
        }
        if(xhr.status == 404){
            //console.log("Not found");
        }
    }
};

xhr = makeCorsRequest();
xhr.onreadystatechange = orscFunction;

/* --------------------------------  ---------------------------------------- */

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


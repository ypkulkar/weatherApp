"strict mode";

var object;
var today = new Date();

// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// console.log(date);
// console.log(time);


xhr = makeCorsRequest();

xhr.onreadystatechange = function(){
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


    // console.log(`Hour1: ${((today.getHours()+1)%12 == 0)?12:(today.getHours()+1)}`);
    // console.log(`Hour2: ${(today.getHours()+2)%12}`);
    // console.log(`Hour3: ${(today.getHours()+3)%12}`);
    // console.log(`Hour4: ${(today.getHours()+4)%12}`);
    // console.log(`Hour5: ${(today.getHours()+5)%12}`);
}
"strict mode";

xhr = makeCorsRequest();

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){ // Request is done
        if(xhr.status == 200){ // Everything is smooth
            let object = JSON.parse(xhr.responseText);
            console.log(object);
        }
        if(xhr.status == 404){
            console.log("Not found");
        }
    }
};


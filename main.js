video= "";
objects= [];
status= "";

function setup(){
    canvas= createCanvas(480, 380);
    canvas.center();
}

function preload(){
    video= createVideo("video.mp4");
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i < objects.length;  i++){
            document.getElementById("status").innerHTML= "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML= "Number of Objects are: "+objects.length;
            fill("#5d259c");
            stroke("#5d259c");
            percent= floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects= results;
}
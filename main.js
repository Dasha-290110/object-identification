status="";
img="";
objects=[];


 function setup(){
    canvas=createCanvas(380,380)
    canvas.center();
    video=createCapture(VIDEO);
    //video.size(380,380);
    video.hide()
    objectdetector=ml5.objectDetector('cocossd',modalLoaded);
document.getElementById('status').innerHTML="Status : Detecting Objects";
}

function modalLoaded(){
console.log("Modal is loaded") ;
status=true;

}

function gotresult(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}



function draw(){
    image(video,0,0,640,420);
    r=random(255);
    g=random(255);
    b=random(255);

    if(status!=""){
        objectdetector.detect(video,gotresult);
        for(i=0;i<objects.length;i++){
        document.getElementById('status').innerHTML="Status : objects detected";
        document.getElementById('no.object').innerHTML="The number of object detected are :" + objects.length; 
        fill(r,g,b);
        per_cent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+ per_cent+"%",objects[i].x+15,objects[i].y+15);
        noFill()
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}
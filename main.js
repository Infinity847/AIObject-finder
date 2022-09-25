var stats = false;
var objects = [];
var said = true;
// var webcamswitch = true;
function setup() 
{
    canvas = createCanvas(460,460);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(460,460);
    video.hide();
}
function draw() 
{
    // if (webcamswitch) 
    {
        background(255);
        image(video, 0, 0, 460, 460);
        if (stats) {
            objectDetector.detect(video, gotResult);
        }
    } 
    // else
    // {
    //     background(255);
    //     image(video, 0, 0, 460, 460);
    //     fill("white");
    //     stroke("white");
    //     text("The object you were looking for was found.", mouseX, mouseY);
    // }
}
function modelLoaded() {
    console.log("cocossd is loaded");
    stats = true;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function gotResult(error,results) {

    if (error) {
        console.log("Error");
    }else {
        console.log(results);
        objects = [];
        for (i = 0; i < results.length; i++) {
            stroke("white");
            percent = floor(results[i].confidence * 100);
            text(results[i].label + " " + percent + "%", results[i].x + 15, results[i].y + 15);
            noFill();
            rect(results[i].x,results[i].y,results[i].width,results[i].height);
          objects.push(results[i].label);
             if (document.getElementById("ObjectName").value == results[i].label) {
                if (said) {
            saytext("The object you were looking for is found.");
            said = false;
                }
            }
        }
        document.getElementById("status").innerHTML = "Status : Detecting Objects (" +objects+" found)";
    }
}
function start() {
    // webcamswitch = true;
    document.getElementById("status").innerHTML = "Status : Loading Nueral Network...";
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    said = true;
 
}
function saytext(text) 
{
  const sound = new SpeechSynthesisUtterance(text);
  sound.rate = 1;
  sound.volume = 1;
  speechSynthesis.speak(sound);
}
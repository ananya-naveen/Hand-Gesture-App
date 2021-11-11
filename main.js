meaning="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
    });
}

console.log("ml5 version: ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/D82oZqKF7/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model's Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speakData="this gesture indicates "+meaning;
    var utterThis=new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("resultGestureName").innerHTML=results[0].label;

        if(results[0].label=="Superb"){
            document.getElementById("updateEmoji").innerHTML="&#128076;";
            meaning="that something is amazing";
            speak();
        }
        if(results[0].label=="Great"){
            document.getElementById("updateEmoji").innerHTML="&#128077;";
            meaning="that you did great";
            speak();
        }
        if(results[0].label=="Victory"){
            document.getElementById("updateEmoji").innerHTML="&#9996;";
            meaning="that this is our victory";
            speak();
        }
        if(results[0].label=="Stop"){
            document.getElementById("updateEmoji").innerHTML="&#128400;";
            meaning="you to stop";
            speak();
        }
    }
}
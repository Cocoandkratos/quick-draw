function setup()
{
    canvas=createCanvas(280,280);
    canvas.center();
    //background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload()
{
    classifier=ml5.imageClassifier('DoodleNet');
}

function clear_canvas()
{
  background("blue");
}

function draw()
{
    //strokewidth
    strokeWeight(10);

    //This will set the color of the stroke
    stroke(0);

    //If mouse is pressed, draw line between previous and current mouse positions
    if (mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    
}

function classifyCanvas()
{
  classifier.classify(canvas, gotresults)
}

function gotresults(error, results)
{
   if (error){
       console.error(error)
   }
   console.log(results);
   document.getElementById("label").innerHTML = "Label : "+results[0].label;

   document.getElementById("confidence").innerHTML = "confidence: "+ Math.round(results[0].confidence * 100)+" % ";


   utterthis = new SpeechSynthesisUtterance(results[0].label);
   synth.speak(utterthis);
}


var graphs = [];
var graphCount = 0;

function getGraphs(){
  var zoom_rangeslider = document.getElementById("zoom");
  zoom = zoom_rangeslider.value;

  var n_rangeslider = document.getElementById("n");
  n = n_rangeslider.value;

  for (var i = 0; i < graphs.length; i++) {
    graphs[i].index = i;
  }

  for (var i = 0; i < graphs.length; i++) {
    graphs[i].equation = document.getElementById(graphs[i].elem + "form").value;
    graphs[i].getDomain();
  }
}


function Graph(){
  this.equation = "";
  this.prevEquation = "";
  this.elem = "";
  this.index = 0;

  this.showAreaUnderCurve = false;
  this.showTangent = false;

  this.domain = [];
  this.outputQueue = [];
  this.color = getRGB();

  this.elem = "graph" + graphCount;
  graphCount++;

  this.tan = document.createElement("Button");
  this.integral = document.createElement("Button");
  this.defIntegral = document.createElement("Span");
  this.tanEquals = document.createElement("Span");

  this.showTangentLine = function(){
    if(this.showTangent == false || this.showTangent == undefined){
      this.showTangent = true;
    }else{
      this.showTangent = false;
    }
  }
  this.showDefiniteIntegral = function(){
    if(this.showAreaUnderCurve == false || this.showAreaUnderCurve == undefined){

      for (var i = 0; i < graphs.length; i++) {
        graphs[i].showAreaUnderCurve = false;
        graphs[i].integral.style.background = "#121212";
        graphs[i].integral.style.color = "white";
      }

      this.showAreaUnderCurve = true;
    }else{
      this.showAreaUnderCurve = false;
    }
  } 

  this.getDomain = function(){
    this.domain = [];
    let inputs = canvas.width;

    if(this.prevEquation != this.equation){
      this.prevEquation = this.equation;
      this.outputQueue = parse(this.equation);
    }

    for (var i = -offX * canvas.width/zoom - inputs/2; i < -offX * canvas.width/zoom + inputs/2; i++) {
      let x = (i / canvas.width ) * zoom;
      let y = this.func(x);
      
      this.domain.push(y);
    }
  }

  this.func = function(x){
    let y = eval(this.outputQueue, x);
    return -y;
  }

  InitNewGraphHTML(this, this.tan, this.integral, this.tanEquals, this.defIntegral);
}

function InitNewGraphHTML(graph, tan, integral, tanEquals, defIntegral){
  // console.log(graph)
  let divElement = document.createElement("Div");
    divElement.id = graph.elem;
    divElement.style.marginBottom = "5px";
    divElement.style.marginTop = "5px";
  document.getElementById("form-group").appendChild(divElement)

  let fOfXEquals = document.createElement("Span");
    fOfXEquals.id = "fOfXEquals"
    fOfXEquals.innerHTML = "<span>f(x) =</span>";
    fOfXEquals.style.color = "white";
    fOfXEquals.style.width = "30px";
    fOfXEquals.style.margin = "0px";
    fOfXEquals.style.padding = "0px";
    fOfXEquals.style.boarder = "5px";
    fOfXEquals.style.textdecoration = "none";
  document.getElementById(graph.elem).appendChild(fOfXEquals)

  let inputElement = document.createElement("Input");
    inputElement.id = graph.elem + "form";
    inputElement.style.color = "white";
    inputElement.style.textdecoration = "none";
    inputElement.style.cursor = "text";
    inputElement.style.border = "2px solid " + graph.color;
  document.getElementById(graph.elem).appendChild(inputElement)

  let deleteElem = document.createElement("Button");
    deleteElem.id = "button"
    deleteElem.innerHTML = "X";
    deleteElem.style.fontSize = "10px";
    deleteElem.style.border = "2px solid red";
    deleteElem.style.width = "auto";
    deleteElem.style.color = "white";
    deleteElem.style.background = "red";

    deleteElem.addEventListener("mousedown", function(){
      if(graphs.length > 1){
        document.getElementById(graph.elem).remove();
        removeFromArray(graphs,graph.index)
      }
    });
  document.getElementById(graph.elem).appendChild(deleteElem)

  tan.id = "button"
  tan.innerHTML = "d/dx";
  tan.style.border = "2px solid " + graph.color;

  tan.addEventListener("mousedown", function(){
    graph.showTangentLine();
    if(graph.showTangent == false || graph.showTangent == undefined){
      tan.style.background = "#121212";
      tan.style.color = "white";
    }else{
      tan.style.background = "white";
      tan.style.color = "#121212";
    }
  });

  document.getElementById(graph.elem).appendChild(tan)

    tanEquals.innerHTML = "<span>= </span>";
    tanEquals.style.color = "white";
    tanEquals.style.width = "30px";
    tanEquals.style.margin = "0px";
    tanEquals.style.padding = "0px";
    tanEquals.style.boarder = "5px";
    tanEquals.style.textdecoration = "none";
  document.getElementById(graph.elem).appendChild(tanEquals)


  integral.id = "button"
  integral.innerHTML = "∫f(x)dx";
  integral.style.border = "2px solid " + graph.color;

  integral.addEventListener("mousedown", function(){
    graph.showDefiniteIntegral();
    if(graph.showAreaUnderCurve == false || graph.showAreaUnderCurve == undefined){
      integral.style.background = "#121212";
      integral.style.color = "white";
    }else{
      integral.style.background = "white";
      integral.style.color = "#121212";
    }
  });

  document.getElementById(graph.elem).appendChild(integral)

    defIntegral.innerHTML = "<span>=  </span>";
    defIntegral.style.color = "white";
    defIntegral.style.width = "30px";
    defIntegral.style.margin = "0px";
    defIntegral.style.padding = "0px";
    defIntegral.style.boarder = "5px";
    defIntegral.style.textdecoration = "none";
  document.getElementById(graph.elem).appendChild(defIntegral)

}

// ∫f(x)dx
// d/dx

function FuncDerivitive(x, set){
    let xAfterZoom = (x / canvas.width) * zoom;

    let h = (zoom / canvas.width);

    let riseRight = set[Math.floor((x + offX * canvas.width/zoom + set.length/2) + 1)] - set[Math.floor(x + offX * canvas.width/zoom + set.length/2)];
    let runRight = (xAfterZoom + h) - xAfterZoom;

    let riseLeft = set[Math.floor((x + offX * canvas.width/zoom + set.length/2) - 1)] - set[Math.floor(x + offX * canvas.width/zoom + set.length/2)];
    let runLeft = (xAfterZoom - h) - xAfterZoom;

    let avgRise = riseRight + riseLeft / 2;
    let avgRun = runRight + runLeft / 2;

  return {d:avgRise, dx:avgRun};
}

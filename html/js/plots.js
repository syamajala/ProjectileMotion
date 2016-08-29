var topelem = document.getElementById("topPlot");
var toplastDiv = ""
topelem.onchange = function(){
    var hiddenDiv = document.getElementById(topelem.options[topelem.selectedIndex].value);
    hiddenDiv.style.display = (this.value == "") ? "none":"block";
    if (toplastDiv != "")
    {
        toplastDiv.style.display = "none"
    }
    toplastDiv = hiddenDiv
};

var bottomelem = document.getElementById("bottomPlot");
var bottomlastDiv = ""
bottomelem.onchange = function(){
    var hiddenDiv = document.getElementById(bottomelem.options[bottomelem.selectedIndex].value);
    hiddenDiv.style.display = (this.value == "") ? "none":"block";
    if (bottomlastDiv != "")
    {
        bottomlastDiv.style.display = "none"
    }
    bottomlastDiv = hiddenDiv
};

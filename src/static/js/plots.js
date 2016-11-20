var plotelem = document.getElementById("plot_select");
var plotlastDiv = document.getElementById("plot0")



plotelem.onchange = function(){
    var hiddenDiv = document.getElementById(plotelem.options[plotelem.selectedIndex].value);
    hiddenDiv.style.visibility = (this.value == "") ? "hidden":"visible";
    plotlastDiv.style.visibility = "hidden";
    hiddenDiv.style.display = (this.value == "") ? "none":"block";
    plotlastDiv.style.display = "none";

    plotlastDiv = hiddenDiv
};

var plotelem = document.getElementById("plot_select");
var plotlastDiv = document.getElementById("plot0")

var plots = document.getElementsByClassName('plots')

for (i = 0; i < plots.length; i++)
{
    var plot = plots[i];

    if(plot.style.visibility == "hidden")
    {
        plot.style.display = "none"
    }

}

plotelem.onchange = function(){
    var hiddenDiv = document.getElementById(plotelem.options[plotelem.selectedIndex].value);

    hiddenDiv.style.visibility = (this.value == "") ? "hidden":"visible";
    plotlastDiv.style.visibility = "hidden";

    hiddenDiv.style.display = (this.value == "") ? "none":"block";
    plotlastDiv.style.display = "none";

    plotlastDiv = hiddenDiv
};

// function openTab(evt, tabName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(tabName).style.display = "block";
//     evt.currentTarget.className += " active";
// }

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();

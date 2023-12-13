document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("play").onclick = play;
    document.getElementById("close").onclick = close;
    document.getElementById("start").onclick = start;
});
function play(){
    const work = document.querySelector(".work");
    work.style.visibility = "visible";
}
function close(){
    const work = document.querySelector(".work");
    work.style.visibility = "hidden";
}
function start(){
    const circle = document.querySelector(".circle");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++; 
            elem.style.top = pos + "px"; 
            elem.style.left = pos + "px"; 
        }  
    }
}
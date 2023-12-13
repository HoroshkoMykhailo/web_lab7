document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("play").onclick = play;
    document.getElementById("close").onclick = close;
});
function play(){
    const work = document.querySelector(".work");
    work.style.visibility = "visible";
}
function close(){
    const work = document.querySelector(".work");
    work.style.visibility = "hide";
}
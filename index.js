document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("play").onclick = play;
    document.getElementById("close").onclick = close;
    document.getElementById("start").onclick = start;
    document.getElementById("reload").onclick = reload;
});
function play(){
    const work = document.querySelector(".work");
    work.style.visibility = "visible";
}
function close(){
    const work = document.querySelector(".work");
    work.style.visibility = "hidden";
}
function reload(){
    const circle = document.querySelector(".circle");
    circle.style.marginLeft = 0;
    circle.style.marginTop = 0;
    const reload = document.getElementById("reload");
    reload.style.display = "none";
    const button = document.getElementById("start");
    button.style.display = "block";
    button.onclick = start;
}
async function start(){
    const button = document.getElementById("start");
    button.onclick = null;
    const circle = document.querySelector(".circle");
    let pixels = 0;
    let left = 0;
    let top = 0;
    let string = "";
    while(true){
        await moveleft(circle, left-pixels, left);
        left = left-pixels;
        string += "(" + left + ";" + top +")";
        pixels++;
        await movetop(circle, top-pixels, top);
        top = top-pixels;
        string += "(" + left + ";" + top +")";
        pixels++;
        await moveright(circle, left + pixels, left);
        left = left + pixels;
        string += "(" + left + ";" + top +")";
        pixels++;
        await movebottom(circle, top + pixels, top);
        top = top + pixels;
        pixels++;
        string += "(" + left + ";" + top +")";

        string = "";
        if(pixels > 100){
            break;
        }
    }
    button.style.display = "none";
    const reload = document.getElementById("reload");
    reload.style.display = "block";
    
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveright(el, pixels, start){
    while(start < pixels){
        start++;
        el.style.marginLeft = start + "px";
        await sleep(1);
    }
}
async function movebottom(el, pixels, start){
    while(start < pixels){
        start++;
        el.style.marginTop = start + "px";
        await sleep(1);
    }
}
async function moveleft(el, pixels, start){
    while(start > pixels){
        start--;
        el.style.marginLeft = start + "px";
        await sleep(1);
    }
    
}
async function movetop(el, pixels, start){
    while(start > pixels){
        start--;
        el.style.marginTop = start + "px";
        await sleep(1);
    }
}
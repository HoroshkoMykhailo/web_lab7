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
async function start(){
    const circle = document.querySelector(".circle");
    let pixels = 0;
    let left = 0;
    let top = 0;
    while(true){
        await moveleft(circle, left-pixels, left);
        left = -pixels;
        pixels++;
        await movetop(circle, top-pixels, top);
        top = -pixels;
        pixels++;
        await moveright(circle, left + pixels, left);
        left = left + pixels;
        pixels++;
        await movebottom(circle, top + pixels, top);
        top = top + pixels;
        if(pixels > 100){
            break;
        }
    }
    
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
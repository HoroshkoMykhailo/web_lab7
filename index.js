document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("play").onclick = play;
    document.getElementById("close").onclick = close;
    document.getElementById("start").onclick = start;
    document.getElementById("reload").onclick = reload;
    flag = true;
});
let count = 1;
let start_time, curr, flag;
function play(){
    const work = document.querySelector(".work");
    const table = document.querySelector(".output");
    table.style.display = "none";
    table.innerHTML = '';
    curr = new Date();
    start_time = curr.getTime();
    save_to_server("Button play was pressed");
    localStorage.setItem(count, "Button play was pressed" + "(" + 0 + ").");
    count++;
    work.style.display = "flex";
    
}
function close(){
    flag = false;
    reload();
    flag = true;
    const work = document.querySelector(".work");
    const table = document.querySelector(".output");
    curr = new Date();
    save_to_server("Button close was pressed");
    localStorage.setItem(count, "Button close was pressed" + "(" + (curr.getTime() - start_time) + ").");
    count++;
    let item, row, cell;
    row = table.insertRow();
    cell = row.insertCell(0);
    cell.innerHTML = "Local Storage";
    cell = row.insertCell(1);
    cell.innerHTML = "Server storage";
    let data = load_from_server();
    for(i = 1; i < count; i++){
        item = localStorage.getItem(i);
        row = table.insertRow();
        cell = row.insertCell(0);
        cell.innerHTML = item;
        cell = row.insertCell(1);
        cell.innerHTNL = data[i-1].action + "(" + (data[i-1].timestamp - start_time) + ").";
    }
    count = 1;
    table.style.display = "block";
    localStorage.clear();
    work.style.display = "none";
}
function reload(){
    curr = new Date();
    if(flag){
        save_to_server("Button reload was pressed");
        localStorage.setItem(count, "Button reload was pressed" + "(" + (curr.getTime() - start_time) + ").");
        count++;
    }
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
    curr = new Date();
    save_to_server("Button start was pressed");
    localStorage.setItem(count, "Button start was pressed" + "(" + (curr.getTime() - start_time) + ").");
    count++;
    const button = document.getElementById("start");
    button.onclick = null;
    const circle = document.querySelector(".circle");
    let pixels = 0, left = 0, top = 0, countq = 0;
    let left_top = false, right_top = false, right_down = false, left_down = false;
    while(true){
        await moveleft(circle, left-pixels, left);
        curr = new Date();
        save_to_server("Circle went left by " + pixels);
        localStorage.setItem(count, "Circle went left by " + pixels + "(" + (curr.getTime() - start_time) + ")." );
        count++;
        left = left-pixels;

        if(!left_down && left < -10 && top > 10){
            countq++;
            left_down = true;
            if(countq == 4) break;
        }

        pixels++;
        await movetop(circle, top-pixels, top);
        curr = new Date();
        save_to_server("Circle went top by " + pixels);
        localStorage.setItem(count, "Circle went top by " + pixels + "(" + (curr.getTime() - start_time) + ").");
        count++;
        top = top-pixels;

        if(!left_top && left < -10 && top < -10){
            countq++;
            left_top = true;
            if(countq == 4) break;
        }
        pixels++;
        await moveright(circle, left + pixels, left);
        curr = new Date();
        save_to_server("Circle went right by " + pixels);
        localStorage.setItem(count, "Circle went right by " + pixels + "(" + (curr.getTime() - start_time) + ")." );
        count++;
        left = left + pixels;

        if(!right_top && left > 10 && top < -10){
            countq++;
            right_top = true;
            if(countq == 4) break;
        }

        pixels++;
        await movebottom(circle, top + pixels, top);
        curr = new Date();
        save_to_server("Circle went bottom by " + pixels);
        localStorage.setItem(count, "Circle went bottom by " + pixels + "(" + (curr.getTime() - start_time) + ").");
        count++;
        top = top + pixels;

        if(!right_down && left > 10 && top > 10){
            countq++;
            right_down = true;
            if(countq == 4) break;
        }

        pixels++;
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
        await sleep(10);
    }
}
async function movebottom(el, pixels, start){
    while(start < pixels){
        start++;
        el.style.marginTop = start + "px";
        await sleep(10);
    }
}
async function moveleft(el, pixels, start){
    while(start > pixels){
        start--;
        el.style.marginLeft = start + "px";
        await sleep(10);
    }
    
}
async function movetop(el, pixels, start){
    while(start > pixels){
        start--;
        el.style.marginTop = start + "px";
        await sleep(10);
    }
}

async function save_to_server(data){
    fetch("save_to_file.php", {
        method: "POST",
        body: data
    })
}
async function load_from_server(){
    let data = fetch("read_from_file.php");
    return data;
}
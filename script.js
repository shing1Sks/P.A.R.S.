// section 1 body buttons
for(let i=1;i<=8;i++){
    for(let j=1;j<=4;j++){
        document.querySelector(`#bp${j}${i}`).addEventListener('click',()=>{bodyFunc(`#bp${j}${i}`,j,i);});
    }
}
let btnStatus = [];
for(let i=1;i<=8;i++){
    btnStatus[i-1]=[];
    for(let j=1;j<=4;j++){
        btnStatus[i-1][j-1]=1;
    }
}

function bodyFunc(id,j,i){
    const btn = document.querySelector(id);
    if(btnStatus[i-1][j-1]==1){
        btn.style.border="2px solid black";
        btnStatus[i-1][j-1]=0;
    }else{
        btn.style.border="none";
        btnStatus[i-1][j-1]=1;
    }    
}

// section 2 range value
const range = document.querySelector('.range');
const val = document.querySelector('#rateVal');
range.addEventListener("input",()=>{val.innerHTML = `value-${range.value}`;})

//section 3 collecting the values 
const submit = document.querySelector('#submit');
submit.addEventListener("click",collect);
let recordInd=1;
const table = document.querySelector("#dataRecord");
function collect(){
    let parsedVals = parser();
    if(parsedVals.length>=1){
        let timeStamp = new Date().toLocaleString();
        let timeStampMilli = new Date();
        timeStampMilli = timeStampMilli.getTime();
        table.innerHTML+=`<tr><td>${recordInd++}</td><td>${timeStamp}</td><td>${range.value}</td><td>Recorded</td></tr>`;
        addData(timeStamp,timeStampMilli,range.value);
    }
    clearSelections();
}

function clearSelections(){
    for(let i=1;i<=8;i++){
        for(let j=1;j<=4;j++){
            document.querySelector(`#bp${j}${i}`).style.border="none";
            btnStatus[i-1][j-1]=1;
        }
    }
}

function parser(){
    let parts = [];
    let ind=0;
    for (let i=0;i<btnStatus.length;i++){
        for(let j=0;j<btnStatus[0].length;j++){
            if(btnStatus[i][j]==0){
                parts[ind]=`${i+1}${j+1}`;
                ind++;
            }
        }
    }
    return parts;
}

//section 4 write data collected to local storage - browser
let key = "user";
let indices = 0;
// value - > { index wise} - > per index - > {timestamps : [] ,discomfortReading : [], location : [one or more] }
let dataIndex=1;
function addData(time,timeMilli,range){
    if(localStorage.getItem("indices")==null){
        indices=0;
    }
    else{
        indices = localStorage.getItem("indices");
    }
    let value = {};
    value = {
        timeStamp : time,
        time:timeMilli,
        rating : range,
        location : parser()
    }
    value = JSON.stringify(value);
    localStorage.setItem(indices,value);
    indices++;
    localStorage.setItem("indices",indices);
}
//clear storage
function empty(){
    localStorage.clear();
}

//section 5 user data 
const user = document.querySelector("#userBTN");
user.addEventListener("click",userFunc);
function userFunc(){
    const name = document.querySelector("#usrName");
    const phone = document.querySelector("#usrPhone");
    const nameD = document.querySelector("#nameData");
    const phoneD = document.querySelector("#phoneData");
    localStorage.setItem("name",name.value);
    localStorage.setItem("phone",phone.value);
    nameD.innerHTML=name.value;
    phoneD.innerHTML=phone.value;
    user.innerHTML="update";
}

// update status
if(localStorage.getItem("indices")!=null){
    function setUp(){
        for(let i=0;i<localStorage.getItem("indices");i++){
            let value = localStorage.getItem(i);
            value = JSON.parse(value);
            table.innerHTML+=`<tr><td>${recordInd++}</td><td>${value.timeStamp}</td><td>${value.rating}</td><td>Recorded</td></tr>`;
        }
    }
    setUp();
}
if(localStorage.getItem("name")!=null || localStorage.getItem("name")!=""){
    const name = document.querySelector("#nameData");
    const phone = document.querySelector("#phoneData");
    const nameD = localStorage.getItem("name");
    const phoneD = localStorage.getItem("phone");
    name.innerHTML=nameD;
    phone.innerHTML=phoneD;
    user.innerHTML="update";
}

//reset the data and user
const reset = document.querySelector("#reset");
reset.addEventListener("click",resetFunc);
function resetFunc(){
    empty();
    recordInd=1;
    const name = document.querySelector("#usrName");
    const phone = document.querySelector("#usrPhone");
    const nameD = document.querySelector("#nameData");
    const phoneD = document.querySelector("#phoneData");
    localStorage.setItem("name",name.value);
    localStorage.setItem("phone",phone.value);
    nameD.innerHTML=name.value;
    phoneD.innerHTML=phone.value;
    user.innerHTML="update";
    table.innerHTML="<tr><th>index</th><th>time stamp</th><th>difficulty</th><th>status</th></tr>";
}
let t=gsap.timeline()
let qr_textinput=document.querySelector("input.qr_textinput");
let generate_qr=document.querySelector("button.generate");
let qr_download=document.querySelector("button.download_qr");
let download=document.querySelector("a.download");
let qr_img=document.querySelector("img.qr");
let downarrow1=document.querySelector("i.downarrow1");
let uparrow1=document.querySelector("i.uparrow1");
let downarrow2=document.querySelector("i.downarrow2");
let uparrow2=document.querySelector("i.uparrow2");
let downarrow3=document.querySelector("i.downarrow3");
let uparrow3=document.querySelector("i.uparrow3");
let explain1=document.querySelector("p.explain1");
let explain2=document.querySelector("p.explain2");
let explain3=document.querySelector("p.explain3");

t.from("img.qr",{
    opacity:0,
    x:100
})

downarrow1.addEventListener("click",()=>{
    t.from("p.explain1",{
        x:25,
        opacity:0
    })
})

downarrow2.addEventListener("click",()=>{
    t.from("p.explain2",{
        x:25,
        opacity:0
    })
})

downarrow3.addEventListener("click",()=>{
    t.from("p.explain3",{
        x:25,
        opacity:0
    })
})

generate_qr.addEventListener("click",()=>{
    let data=qr_textinput.value;
    if(data.length>=1){
        let qr_url=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
        qr_img.src=qr_url;
    }
    else{
        qr_img.src="qr.jpeg";
    }
})

// Download Feature

qr_download.addEventListener("click",()=>{

async function download(){

    // Fetched the image 
    let data=await fetch(qr_img.src);

    //And converted into blob. Blob are often used for handling files in web applications.
    let result=await data.blob();

    // The URL.createObjectURL method is used to create a temporary URL for the blob, which can be used in the download link.
    const url = window.URL.createObjectURL(result);

    // Creating a anchor tag
    let anchor=document.createElement("a");

    // Putting all necessary information
    anchor.href=url;
    anchor.download="qr-code.jpg";

    // Appending the anchor in body
    document.body.appendChild(anchor);

    // When the anchor is added it will be automatically clicked using click() function
    anchor.click();

    // Removing the anchor from body
    document.body.removeChild(anchor);
}

download();

})

// Arrow Functionality
document.body.addEventListener("click",(e)=>{
    let data=e.target.className;
    if(data.includes("downarrow1")){
        downarrows(explain1,downarrow1,uparrow1);
    }
    else if(data.includes("uparrow1")){
        uparrows(explain1,downarrow1,uparrow1)
    }
    else if(data.includes("uparrow2")){
        uparrows(explain2,downarrow2,uparrow2)
    }
    else if(data.includes("downarrow2")){
        downarrows(explain2,downarrow2,uparrow2)
    }
    else if(data.includes("uparrow3")){
        uparrows(explain3,downarrow3,uparrow3)
    }
    else if(data.includes("downarrow3")){
        downarrows(explain3,downarrow3,uparrow3)
    }
})

// Down Arrow Functionality
function downarrows(explain,downarrow,uparrow){
   explain.style.display="block";
   downarrow.style.display="none";
   uparrow.style.display="block";
}

// Up Arrow Functionality
function uparrows(explain,downarrow,uparrow){
    explain.style.display="none";
    downarrow.style.display="block";
    uparrow.style.display="none";
}

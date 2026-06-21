async function signup() {

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  if(name === "" || email === "" || password === ""){

    alert("Please fill all fields");

    return;
  }

  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  if(!emailPattern.test(email)){

    alert("Please enter a valid email");

    return;
  }

  const passwordPattern =
/^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  if(!passwordPattern.test(password)){

alert("Password must contain at least 6 characters, including letters and numbers");
    return;
  }

  const data = {
    name,
    email,
    password
  };

  const res = await fetch("/signup", {

    method: "POST",

    headers: {
      "Content-Type":"application/json"
    },

    body: JSON.stringify(data)
  });

  const result = await res.json();

  alert(result.message);

  if(res.ok){

    window.location.href = "login.html";
  }
}

const password = document.getElementById("password");
const toggleIcon = document.getElementById("toggleIcon");

function handlePasswordInput() {
      if (password.value.length > 0) {
        toggleIcon.classList.add("show");
    } else {
        toggleIcon.classList.remove("show");
    }
}

function handleNewPasswordInput() {
    const input = document.getElementById("newPassword");
    const icon = document.getElementById("toggleIcon");

    if (input.value.length > 0) {
        icon.classList.add("show");
    } else {
        icon.classList.remove("show");
    }
}

function handleConfirmPasswordInput() {
    const input = document.getElementById("confirmPassword");
    const icon = document.getElementById("toggleConfirmIcon");

    if (input.value.length > 0) {
        icon.classList.add("show");
    } else {
        icon.classList.remove("show");
    }
}

 function toggleVisibility() {
    const pwdInput = document.getElementById("password");
    const icon = document.getElementById("toggleIcon");
    

    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      icon.src = "https://img.icons8.com/nolan/64/visible.png";
    } else {
      pwdInput.type = "password";
      icon.src = "https://img.icons8.com/nolan/64/closed-eye.png";
    }
  }

  

async function login() {

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  if(email === "" || password === ""){

    alert("Please fill all fields");

    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  if(!emailPattern.test(email)){

    alert("Please enter a valid email");

    return;
  }

  const passwordPattern =
/^(?=.*[A-Za-z])(?=.*\d).{6,}$/

  if(!passwordPattern.test(password)){

    alert("Password is invalid");

    return;
  }

  const data = {
    email,
    password
  };

  const res = await fetch("/login", {

    method: "POST",

    headers: {
      "Content-Type":"application/json"
    },

    body: JSON.stringify(data)
  });

  const result = await res.json();

  if(result.token){

    localStorage.setItem("token", result.token);

    localStorage.setItem("name", result.name);

    localStorage.setItem("email", result.email);

    window.location.href = "home.html";
  }
  else{

    alert("Please enter valid credentials");
  }
}



async function sendOTP(){
  const email =
    document.getElementById("email").value.trim();
  if(email === ""){
    alert("Enter Email");  
    return;
  }
  const emailPattern =
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
if(!emailPattern.test(email)){
  alert("Enter valid Email");
  return;
}
  const res = await fetch(
    "/send-otp",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ email })
    }
  );
  const result = await res.json();
  alert(result.message);
}


async function verifyOTP(){
 const otp = document.getElementById("otp").value.trim();
  if(otp === ""){
    alert("Enter OTP");
    return;
  }
  if(!/^\d{4}$/.test(otp)){
    alert("OTP must contain 4 digits");
    return;
  }
  const email = document.getElementById("email").value.trim();
  const res = await fetch( "/verify-otp",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ otp })
    }
  );
  const result = await res.json();
 const tick =
document.getElementById("tickIcon");

const cross =
document.getElementById("tickIcon1");

if(result.success){

    tick.style.display = "block";
    cross.style.display = "none";

    setTimeout(() => {
        window.location.href =
        "reset.html?email=" + email;
    }, 1000);

}
else{

    tick.style.display = "none";
    cross.style.display = "block";
    alert("Invalid OTP");
}
}



async function resetPassword(){
  const params =
    new URLSearchParams(window.location.search);
  const email =
    params.get("email");
  const password =
    document.getElementById("newPassword").value.trim();
    const confirmPassword =
document.getElementById("confirmPassword").value.trim();
if(password !== confirmPassword){
    alert("Passwords do not match");
    return;
}
  if(password === ""){
    alert("Please enter password");
    return;
  }
  const passwordPattern =
/^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  if(!passwordPattern.test(password)){
   alert("Password must contain at least 6 characters, including letters and numbers");
    return;
  }
  const res = await fetch(
    "/reset-password",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }
  );
  if(res.ok){
    window.location.href = "login.html";
  }
}






 let foods = {
      Orange:{protein:0.9,fat:0.1,fiber:2.4,carbs:11.8,calcium:40, img:"https://tse4.mm.bing.net/th/id/OIP._fpL6Wo5uc-yHoUrkQEB8gHaFj?pid=Api&h=220&P=0"},
      Almonds:{protein:21.2,fat:49.9,fiber:12.5,carbs:21.6,calcium:269, img:"https://tse2.mm.bing.net/th/id/OIP.S9Cqtt2_Vt3ocdmTyoIr-wHaEw?pid=Api&h=220&P=0"},
      Burger:{protein:17.0,fat:15.0,fiber:1.5,carbs:30.0,calcium:100, img:"https://tse3.mm.bing.net/th/id/OIP.Oj9ppaRfiy0FICs7w-pTtQHaHa?pid=Api&h=220&P=0"},
      Spinach:{protein:2.9,fat:0.4,fiber:2.2,carbs:3.6,calcium:99, img:"https://tse4.mm.bing.net/th/id/OIP.C_YfNbtMM86ry2u3tfihFwHaFj?pid=Api&h=220&P=0"},
      Apple:{protein:0.3,fat:0.2,fiber:2.4,carbs:13.8,calcium:6, img:"https://www.collinsdictionary.com/images/full/apple_158989157.jpg"},
      Carrot:{protein:0.9,fat:0.2,fiber:2.8,carbs:9.6,calcium:33, img:"https://tse3.mm.bing.net/th/id/OIP.tr38uLM7QBOLElGJHG88eQHaEi?pid=Api&h=220&P=0"},
      Pizza:{protein:11.0,fat:10.0,fiber:2.3,carbs:33.0,calcium:188, img:"https://tse3.mm.bing.net/th/id/OIP.8UeIFPMYwIErE1ShRYB9QAHaEo?pid=Api&h=220&P=0"},
      Broccoli:{protein:2.8,fat:0.4,fiber:2.6,carbs:6.6,calcium:47, img:"https://tse2.mm.bing.net/th/id/OIP.3k8082immh_-bfqWvkc7KgHaEm?pid=Api&h=220&P=0"},
      Chips:{protein:6.0,fat:35.0,fiber:4.8,carbs:53.0,calcium:24, img:"https://tse2.mm.bing.net/th/id/OIP.qkms5akLjvVAq-R2sv9hkgHaFj?pid=Api&h=220&P=0"},
      Banana:{protein:1.1,fat:0.3,fiber:2.6,carbs:22.8,calcium:5, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7ElBNPs-HbYJJOMHRu7lEmphTn8-52FYKw&s"},
      Milk:{protein:3.4,fat:3.3,fiber:0.0,carbs:5.0,calcium:113, img:"https://cdn.britannica.com/77/200377-050-4326767F/milk-splashing-glass.jpg"},
      Fish:{protein:22.0,fat:12.0,fiber:0.0,carbs:0.0,calcium:15, img:"https://continentalfresh.in/cdn/shop/products/IMG-4902.jpg?v=1612248584"},
      Chicken:{protein:27.0,fat:14.0,fiber:0.0,carbs:0.0,calcium:15, img:"https://www.datocms-assets.com/129288/1734105343-homepage_header.png?auto=format&w=2400&h=1567&fit=crop"},
      Meat:{protein:26.0,fat:15.0,fiber:0.0,carbs:0.0,calcium:18, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiWAysLL2VkMYpSvzcYgFP5-6MxW1ur9z15g&s"},
      Prawns:{protein:24.0,fat:0.3,fiber:0.0,carbs:0.2,calcium:70, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGN3_6txDuPkb95ppOB8OLshBEtUy8BSHoPqBo71RkZg&s=10"},
      Egg:{protein:13.0,fat:11.0,fiber:0.0,carbs:1.1,calcium:56, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfiO7agvs5Xg3uKg-u0FIahDpYwib8Fj6giA&s"},
      Cheese:{protein:25.0,fat:33.0,fiber:0.0,carbs:1.3,calcium:721, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ8-CCk_Xk2_JubFk84m1PbDg4efSQ83bfXg&s"},
      PeanutButter:{protein:25.0,fat:50.0,fiber:6.0,carbs:20.0,calcium:43, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6tQv4YikqrVtWf6JjSLS5Q3Os-oBV9bFZg&s"},
      IceCream:{protein:3.5,fat:11.0,fiber:0.0,carbs:24.0,calcium:128, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT532QISWGuf9bHX5Jv333T-bE5tAJTwx6ouQ&s"},
      Watermelon:{protein:0.6,fat:0.2,fiber:0.4,carbs:7.6,calcium:7, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Watermelon_seedless.jpg/250px-Watermelon_seedless.jpg"},
      Grapes:{protein:0.7,fat:0.2,fiber:0.9,carbs:18.1,calcium:10, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQczLLEOk49Pm-VqWD5euheDp8PbdF2FSoyYQ&s"},
      Mango:{protein:0.8,fat:0.4,fiber:1.6,carbs:15.0,calcium:11, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4fYh6jkcSKf2g3fxRoDBtHDOqbBwob9A1oQ&s"},
      Oats:{protein:16.9,fat:6.9,fiber:10.6,carbs:66.3,calcium:54, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbWiQ4mListxf41ajEPM7LLcJu4bLRxOUYQg&s"},
      Rice:{protein:2.7,fat:0.3,fiber:0.4,carbs:28.0,calcium:10, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_a2EsuSBF1V-B3dr6I-t3pDzcsdIpVu_vGw&s"},
      Bread:{protein:9.0,fat:3.2,fiber:2.7,carbs:49.0,calcium:144, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgVuo_sYN__UzUkBoVI4C_21Fy8IOqEcPldA&s"}
    };

   async function populateFoods(){

  try{

    await loadFoodsFromDB();

  }catch(error){

    console.log("DB Load Failed");
  }

  Object.keys(foods).forEach(f => {

    const opt1 = document.createElement("option");
    opt1.value = f;
    opt1.text = f;

    const opt2 = document.createElement("option");
    opt2.value = f;
    opt2.text = f;

    food1.appendChild(opt1);
    food2.appendChild(opt2);
  });
}

populateFoods();
    let chart;
    function updateChart() {
      if (!food1.value || !food2.value) {
        alert("⚠️Please select both food items!");
        return;
      }
      img1.src = foods[food1.value].img;
      img2.src = foods[food2.value].img;

      const data = {
        labels: ["Protein (g)", "Fat (g)", "Fiber (g)", "Carbs (g)", "Calcium (mg/10)"],
        datasets: [
          {
            label: food1.value,
            data: [
  foods[food1.value].protein,
  foods[food1.value].fat,
  foods[food1.value].fiber,
  foods[food1.value].carbs,
  foods[food1.value].calcium / 10
],
            backgroundColor: "rgb(0, 221, 255)",
            hoverBackgroundColor: "rgba(0, 162, 255, 1)"
          },
          {
            label: food2.value,
            data: [
  foods[food2.value].protein,
  foods[food2.value].fat,
  foods[food2.value].fiber,
  foods[food2.value].carbs,
  foods[food2.value].calcium / 10
],
            backgroundColor: "rgb(255, 0, 136)",
            hoverBackgroundColor: "rgb(255, 0, 170)"
          }
        ]
      };

      if (chart) chart.destroy();
      chart = new Chart(document.getElementById("chart"), {
        type: "bar",
        data: data,
       options: {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white",
        font: {
        family: "Inter, sans-serif",
        size: 16,
        },
        boxWidth: 35,
        boxHeight: 4,
        padding: 20
      }
    },
    tooltip: {
      enabled: true
    }
  },
  scales: {
    x: {
      ticks: {
          autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
        color: "white",
        font: {
          size: 15,
          weight: "bold"
        }
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "white",
        font: {
          size: 15,
          weight: "bold"
        }
      }
    }
  }
}
});
      const score1 =
foods[food1.value].protein +
foods[food1.value].fiber +
(foods[food1.value].calcium / 10) -
foods[food1.value].fat;      
      const score2 =
foods[food2.value].protein +
foods[food2.value].fiber +
(foods[food2.value].calcium / 10) -
foods[food2.value].fat;
      const best = score1 > score2 ? food1.value : food2.value;
const other = score1 > score2 ? food2.value : food1.value;

resultText.style.display = "block";
resultText.innerHTML =
  "<span style='font-family:\"Times New Roman\",serif;color:white;'>" +
  "<img src='graph.gif' style='width:32px;height:32px;border-radius:10px;vertical-align:-1px;'>" +
  " Recommended food:" + best +
  "</span>" +
  "<img src='tickk.gif' style='width:48px;height:48px;vertical-align:-10px'>";
}


const bgCanvas = document.getElementById("bg");
const bgCtx = bgCanvas.getContext("2d");

function resizeBg(){
    bgCanvas.width = innerWidth;
    bgCanvas.height = innerHeight;
}

resizeBg();
addEventListener("resize", resizeBg);

const stars = [];
const STAR_COUNT = 500;

for(let i=0;i<STAR_COUNT;i++){
    stars.push(resetStar({}));
}

function resetStar(star){
    star.x = (Math.random()-0.5)*2000;
    star.y = (Math.random()-0.5)*2000;
    star.z = Math.random()*2000;
    star.pz = star.z;
    star.color = Math.random()>0.5
        ? "#00d9ff"
        : "#ff00c8";
    return star;
}

let phase = -Math.PI / 2;
function animateBg(){

    phase += 0.008;

const speed =
    8 +
    ((Math.sin(phase) + 1) / 2) * 35;

    bgCtx.fillStyle = "rgba(3,5,10,0.25)";
    bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);

    const cx = bgCanvas.width/2;
    const cy = bgCanvas.height/2;

    for(const s of stars){

        s.z -= speed;

        if(s.z <= 1){
            resetStar(s);
        }

        const sx = (s.x/s.z)*900 + cx;
        const sy = (s.y/s.z)*900 + cy;

        const px = (s.x/s.pz)*900 + cx;
        const py = (s.y/s.pz)*900 + cy;

        s.pz = s.z;

        bgCtx.beginPath();
        bgCtx.strokeStyle = s.color;
        bgCtx.lineWidth = Math.max(0.5,4-s.z/600);
        bgCtx.moveTo(px,py);
        bgCtx.lineTo(sx,sy);
        bgCtx.stroke();
    }

    requestAnimationFrame(animateBg);
}

animateBg();





function toggleProfile(){
    document
    .getElementById("profilePanel")
    .classList
    .toggle("active");
}

document.addEventListener("click", function(e){

    const panel =
        document.getElementById("profilePanel");

    const profileBtn =
        document.querySelector(".profile-btn");

    if(
        !panel.contains(e.target) &&
        !profileBtn.contains(e.target)
    ){
        panel.classList.remove("active");
    }
});

const name =
    localStorage.getItem("name") || "User";

const email =
    localStorage.getItem("email") || "";

document.getElementById("userName")
.textContent = name;

document.getElementById("userEmail")
.textContent = email;

document.getElementById("topAvatar")
.textContent =
name.charAt(0).toUpperCase();



function loadProfile(){

    const savedImage =
    localStorage.getItem(
        "profileImage_" + email
    );

    const avatar =
        document.getElementById("profileAvatar");

    const topAvatar =
        document.getElementById("topAvatar");

    if(savedImage){

        avatar.innerHTML =
        `<img src="${savedImage}">`;

        topAvatar.innerHTML =
        `<img src="${savedImage}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;

    }else{

        avatar.textContent =
        name.charAt(0).toUpperCase();

        topAvatar.textContent =
        name.charAt(0).toUpperCase();
    }
}

loadProfile();

document
.getElementById("profileInput")
.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

       localStorage.setItem(
    "profileImage_" + email,
    event.target.result
);

        loadProfile();
    };

    reader.readAsDataURL(file);
});

function removePhoto(){

    if(!confirm("Remove profile photo?")){
        return;
    }

    localStorage.removeItem(
        "profileImage_" + email
    );

    loadProfile();
}

function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    window.location.href = "login.html";
}



const slider =
document.getElementById(
    "logoutSlider"
);
if(parseInt(slider.style.left || 0) < 10){

    logoutText.style.color =
    "#ffffff";

    logoutText.style.textShadow =
    "none";
}

let dragging = false;
let lastX = 0;

slider.addEventListener(
"mousedown",
()=>{

    dragging = true;
});

document.addEventListener(
"mouseup",
()=>{

    dragging = false;

    window.getSelection()
    .removeAllRanges();
});

document.addEventListener(
"mousemove",
(e)=>{

    if(!dragging) return;

    const track =
    document.querySelector(
        ".logout-track"
    );

    const rect =
    track.getBoundingClientRect();

    let x =
    e.clientX - rect.left - 30;

x = Math.max(
    0,
    Math.min(
        x,
        rect.width - slider.offsetWidth
    )
);

    slider.style.left =
    x + "px";

if(x <= 5){

    slider.style.boxShadow = "none";

    lastX = 0;

}
else if(x > lastX){

    slider.style.boxShadow =
    `
    
    32px 0 32px rgb(255, 0, 0),
    55px 0 55px rgb(163, 0, 0)    `;

}else if(x < lastX){

    slider.style.boxShadow =
    `
    
    -32px 0 32px rgb(4, 255, 0),
    -55px 0 55px rgb(0, 137, 0)    `;
}

lastX = x;

const logoutText =
document.getElementById("logoutText");

const sliderCenter =
x + 30;

const textCenter =
(rect.width / 2);

const progress =
x / (rect.width - 60);

if(progress < 0.45){

    logoutText.innerHTML =
    `<span style="color:white;">SIGN</span>
     <span style="color:white;">OUT</span>`;

}else if(progress < 0.80){

    logoutText.innerHTML =
    `<span style="
        color:#ff0000;
        text-shadow:0 0 15px red;
    ">SIGN</span>
     <span style="color:white;">OUT</span>`;

}else{

    logoutText.innerHTML =
    `<span style="
        color:#ff0000;
        text-shadow:0 0 15px red;
    ">SIGN</span>
     <span style="
        color:#ff0000;
        text-shadow:0 0 15px red;
    ">OUT</span>`;
}



if(
    x >=
    rect.width - slider.offsetWidth - 1
){

  document.body.style.overflow = "hidden";
document.documentElement.style.overflow = "hidden";
    document
    .getElementById(
        "pageContent"
    )
    .classList
    .add("hide-page");

    setTimeout(()=>{

        document
        .getElementById(
            "logoutModal"
        )
        .style.display =
        "flex";

    },100);
}
});

function closeLogoutModal(){

    window.getSelection()
    .removeAllRanges();

    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    document
    .getElementById(
        "logoutModal"
    )
    .style.display =
    "none";

    document
    .getElementById(
        "pageContent"
    )
    .classList
    .remove("hide-page");

    slider.style.left =
    "0px";

const logoutText =
document.getElementById(
    "logoutText"
);

logoutText.innerHTML =
`
<span style="color:white;">SIGN</span>
<span style="color:white;">OUT</span>
`;

logoutText.style.opacity =
"1";

logoutText.style.textShadow =
"none";

slider.style.boxShadow =
"none";
}

function confirmLogout(){

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "name"
    );

    localStorage.removeItem(
        "email"
    );

    window.location.href =
    "login.html";
}

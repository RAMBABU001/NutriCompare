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
  // Fruits
  Orange:{protein:0.9,fat:0.1,fiber:2.4,carbs:11.8,calcium:40,calories:47,sugar:9.0,iron:0.1, img:"https://png.pngtree.com/png-clipart/20240404/original/pngtree-fresh-single-orange-fruit-isolated-on-transparent-background-png-image_14754004.png"},
  Apple:{protein:0.3,fat:0.2,fiber:2.4,carbs:13.8,calcium:6,calories:52,sugar:10.4,iron:0.1, img:"https://png.pngtree.com/png-clipart/20230414/original/pngtree-red-apple-organic-fruit-food-transparent-png-image_9057111.png"},
  Banana:{protein:1.1,fat:0.3,fiber:2.6,carbs:22.8,calcium:5,calories:89,sugar:12.2,iron:0.3, img:"https://png.pngtree.com/png-clipart/20220726/original/pngtree-banana-yellow-banana-skewers-three-fruits-png-image_8413323.png"},
  Watermelon:{protein:0.6,fat:0.2,fiber:0.4,carbs:7.6,calcium:7,calories:30,sugar:6.2,iron:0.2, img:"https://png.pngtree.com/png-clipart/20250122/original/pngtree-watermelon-transparent-background-png-image_19730741.png"},
  Grapes:{protein:0.7,fat:0.2,fiber:0.9,carbs:18.1,calcium:10,calories:69,sugar:15.5,iron:0.4, img:"https://png.pngtree.com/png-clipart/20250501/original/pngtree-a-beautiful-bunch-of-red-grapes-fruit-png-image_20926122.png"},
  Mango:{protein:0.8,fat:0.4,fiber:1.6,carbs:15.0,calcium:11,calories:60,sugar:13.7,iron:0.2, img:"https://png.pngtree.com/png-clipart/20250305/original/pngtree-ripe-mango-fruit-with-leaf-for-healthy-snack-png-image_20574942.png"},
  Strawberries:{protein:0.7,fat:0.3,fiber:2.0,carbs:7.7,calcium:16,calories:32,sugar:4.9,iron:0.4, img:"https://png.pngtree.com/png-clipart/20240610/original/pngtree-strawberry-fruit-juice-isolated-on-transparent-background-png-image_15298010.png"},
  Blueberries:{protein:0.7,fat:0.3,fiber:2.4,carbs:14.5,calcium:6,calories:57,sugar:10.0,iron:0.3, img:"https://png.pngtree.com/png-clipart/20240925/original/pngtree-blueberries-on-transparent-background-png-image_16088931.png"},
  Papaya:{protein:0.5,fat:0.1,fiber:1.7,carbs:11.0,calcium:20,calories:43,sugar:7.8,iron:0.3, img:"https://png.pngtree.com/png-vector/20260902/ourmid/pngtree-half-papaya-fruit-with-seeds-on-transparent-background-png-image_20050784.webp"},
  Avocado:{protein:2.0,fat:15.0,fiber:7.0,carbs:9.0,calcium:12,calories:160,sugar:0.7,iron:0.6, img:"https://png.pngtree.com/png-clipart/20250102/original/pngtree-a-photo-of-whole-avocado-and-halved-with-the-seed-png-image_18633600.png"},
  // Vegetables
  Spinach:{protein:2.9,fat:0.4,fiber:2.2,carbs:3.6,calcium:99,calories:23,sugar:0.4,iron:2.7, img:"https://png.pngtree.com/png-clipart/20250415/original/pngtree-fresh-spinach-leaves-isolated-on-a-transparent-background-png-image_20738157.png"},
  Carrot:{protein:0.9,fat:0.2,fiber:2.8,carbs:9.6,calcium:33,calories:41,sugar:4.7,iron:0.3, img:"https://png.pngtree.com/png-clipart/20241221/original/pngtree-single-fresh-orange-carrot-vegetable-png-image_18122767.png"},
  Broccoli:{protein:2.8,fat:0.4,fiber:2.6,carbs:6.6,calcium:47,calories:34,sugar:1.7,iron:0.7, img:"https://png.pngtree.com/png-vector/20251108/ourmid/pngtree-a-fresh-vibrant-green-head-of-broccoli-with-thick-stalk-shown-png-image_17917971.webp"},
  SweetPotato:{protein:1.6,fat:0.1,fiber:3.0,carbs:20.1,calcium:30,calories:86,sugar:4.2,iron:0.6, img:"https://png.pngtree.com/png-clipart/20250417/original/pngtree-realistic-sweet-potatoes-whole-and-sliced-png-image_20774629.png"},
  Tomato:{protein:0.9,fat:0.2,fiber:1.2,carbs:3.9,calcium:10,calories:18,sugar:2.6,iron:0.3, img:"https://png.pngtree.com/png-clipart/20250222/original/pngtree-realistic-sliced-tomato-with-transparent-background-png-image_20493422.png"},
  Cucumber:{protein:0.6,fat:0.1,fiber:0.5,carbs:3.6,calcium:16,calories:15,sugar:1.7,iron:0.3, img:"https://png.pngtree.com/png-clipart/20240322/original/pngtree-fresh-cucumber-isolated-freshness-vegetable-harvest-and-ingredients-for-cooking-food-png-image_14653724.png"},
  Mushroom:{protein:3.1,fat:0.3,fiber:1.0,carbs:3.3,calcium:3,calories:22,sugar:2.0,iron:0.5, img:"https://png.pngtree.com/png-clipart/20240612/original/pngtree-isolated-oyster-mushroom-cutout-on-transparent-background-png-image_15311254.png"},
  // NonVeg
  Fish:{protein:22.0,fat:12.0,fiber:0.0,carbs:0.0,calcium:15,calories:206,sugar:0.0,iron:0.3, img:"https://png.pngtree.com/png-clipart/20241119/original/pngtree-tilapia-fish-4k-transparent-background-png-image_17267081.png"},
  Chicken:{protein:27.0,fat:14.0,fiber:0.0,carbs:0.0,calcium:15,calories:239,sugar:0.0,iron:1.3, img:"https://png.pngtree.com/png-clipart/20250102/original/pngtree-golden-fried-chicken-legs-perfect-for-snack-and-food-photography-png-image_19841682.png"},
  Meat:{protein:26.0,fat:15.0,fiber:0.0,carbs:0.0,calcium:18,calories:250,sugar:0.0,iron:2.6, img:"https://png.pngtree.com/png-clipart/20250515/original/pngtree-a-juicy-raw-beef-steak-meat-completely-fresh-natural-colour-png-image_20985537.png"},
  Prawns:{protein:24.0,fat:0.3,fiber:0.0,carbs:0.2,calcium:70,calories:99,sugar:0.0,iron:0.5, img:"https://png.pngtree.com/png-clipart/20250601/original/pngtree-cooked-prawns-bright-orange-pink-transparent-background-png-image_21105431.png"},
  Egg:{protein:13.0,fat:11.0,fiber:0.0,carbs:1.1,calcium:56,calories:155,sugar:1.1,iron:1.2, img:"https://png.pngtree.com/png-clipart/20250606/original/pngtree-chicken-eggs-isolated-on-transparent-background-png-image_21133536.png"},
  Salmon:{protein:20.0,fat:13.0,fiber:0.0,carbs:0.0,calcium:9,calories:208,sugar:0.0,iron:0.3, img:"https://png.pngtree.com/png-vector/20260902/ourmid/pngtree-grilled-salmon-fillets-isolated-on-transparent-background-png-image_20076206.webp"},
  // DairyAndProtein
  Almonds:{protein:21.2,fat:49.9,fiber:12.5,carbs:21.6,calcium:269,calories:579,sugar:4.4,iron:3.7, img:"https://png.pngtree.com/png-clipart/20250416/original/pngtree-almonds-and-chocolate-covered-nuts-pile-isolated-on-transparent-background-png-image_20699673.png"},
  Milk:{protein:3.4,fat:3.3,fiber:0.0,carbs:5.0,calcium:113,calories:42,sugar:5.0,iron:0.0, img:"https://png.pngtree.com/png-clipart/20250108/original/pngtree-glass-of-milk-with-splash-isolated-on-transparent-or-white-background-png-image_20116630.png"},
  Cheese:{protein:25.0,fat:33.0,fiber:0.0,carbs:1.3,calcium:721,calories:402,sugar:0.5,iron:0.7, img:"https://png.pngtree.com/png-clipart/20250430/original/pngtree-wedge-of-swiss-cheese-classic-holey-emmental-png-image_20905450.png"},
  PeanutButter:{protein:25.0,fat:50.0,fiber:6.0,carbs:20.0,calcium:43,calories:588,sugar:9.9,iron:1.9, img:"https://png.pngtree.com/png-clipart/20241108/original/pngtree-jar-of-peanut-chocolate-butter-on-transparent-background-png-image_16774769.png"},
  Paneer:{protein:18.0,fat:20.0,fiber:0.0,carbs:1.2,calcium:208,calories:296,sugar:2.6,iron:0.1, img:"https://png.pngtree.com/png-clipart/20250612/original/pngtree-realistic-diced-paneer-cubes-for-indian-recipes-png-image_21185956.png"},
  Tofu:{protein:8.0,fat:4.8,fiber:1.2,carbs:1.9,calcium:350,calories:76,sugar:0.6,iron:5.4, img:"https://png.pngtree.com/png-clipart/20240907/original/pngtree-cubes-of-raw-tofu-on-transparent-background-png-image_15958430.png"},
  Yogurt:{protein:10.0,fat:0.4,fiber:0.0,carbs:3.6,calcium:110,calories:59,sugar:3.2,iron:0.1, img:"https://png.pngtree.com/png-clipart/20250118/original/pngtree-a-bowl-of-greek-yogurt-with-fresh-berries-on-transparent-background-png-image_20059698.png"},
  Walnuts:{protein:15.0,fat:65.0,fiber:7.0,carbs:14.0,calcium:98,calories:654,sugar:2.6,iron:2.9, img:"https://png.pngtree.com/png-clipart/20250202/original/pngtree-walnuts-isolated-on-transparent-background-png-image_20348998.png"},
  // GrainsAndStaples
  Oats:{protein:16.9,fat:6.9,fiber:10.6,carbs:66.3,calcium:54,calories:389,sugar:0.0,iron:4.7, img:"https://png.pngtree.com/png-clipart/20231024/original/pngtree-oats-flakes-pile-on-white-background-lifestyle-photo-png-image_13416114.png"},
  Rice:{protein:2.7,fat:0.3,fiber:0.4,carbs:28.0,calcium:10,calories:130,sugar:0.1,iron:0.2, img:"https://png.pngtree.com/png-clipart/20250501/original/pngtree-dry-white-long-rice-basmati-in-wooden-bowl-isolated-on-transparent-png-image_20918117.png"},
  Bread:{protein:9.0,fat:3.2,fiber:2.7,carbs:49.0,calcium:144,calories:265,sugar:5.0,iron:3.6, img:"https://png.pngtree.com/png-clipart/20250130/original/pngtree-white-bread-loaf-with-three-slices-png-image_20313466.png"},
  Quinoa:{protein:4.4,fat:1.9,fiber:2.8,carbs:21.3,calcium:17,calories:120,sugar:0.9,iron:1.5, img:"https://png.pngtree.com/png-clipart/20250416/original/pngtree-quinoa-in-a-white-bowl-isolated-on-transparent-background-png-image_20699441.png"},
  Dal:{protein:9.0,fat:0.4,fiber:8.0,carbs:20.0,calcium:19,calories:116,sugar:1.0,iron:3.3, img:"https://png.pngtree.com/png-clipart/20240901/original/pngtree-create-an-8k-3d-high-definition-image-of-a-traditional-bowl-png-image_15906131.png"},
  // FastFoodAndDesserts
  Burger:{protein:17.0,fat:15.0,fiber:1.5,carbs:30.0,calcium:100,calories:295,sugar:5.0,iron:2.5, img:"https://png.pngtree.com/png-clipart/20241101/original/pngtree-crispy-cheesy-chicken-patty-burger-on-transparent-background-png-image_16578920.png"},
  Pizza:{protein:11.0,fat:10.0,fiber:2.3,carbs:33.0,calcium:188,calories:266,sugar:3.6,iron:2.5, img:"https://png.pngtree.com/png-clipart/20250415/original/pngtree-picture-of-whole-pizza-hd-transparent-background-png-image_20810524.png"},
  Chips:{protein:6.0,fat:35.0,fiber:4.8,carbs:53.0,calcium:24,calories:536,sugar:0.3,iron:1.6, img:"https://png.pngtree.com/png-clipart/20240718/original/pngtree-a-bowl-of-potato-chips-on-transparent-background-png-image_15582709.png"},
  FrenchFries:{protein:3.4,fat:15.0,fiber:3.8,carbs:41.0,calcium:18,calories:312,sugar:0.3,iron:0.8, img:"https://png.pngtree.com/png-clipart/20250429/original/pngtree-hot-and-crispy-french-fries-in-red-box-png-image_20891964.png"},
  Soda:{protein:0.0,fat:0.0,fiber:0.0,carbs:10.6,calcium:2,calories:41,sugar:10.6,iron:0.1, img:"https://png.pngtree.com/png-clipart/20240813/original/pngtree-orange-soda-in-a-clear-glass-with-bubbles-isolated-on-transparent-png-image_15762929.png"},
  IceCream:{protein:3.5,fat:11.0,fiber:0.0,carbs:24.0,calcium:128,calories:207,sugar:21.0,iron:0.1, img:"https://png.pngtree.com/png-clipart/20241216/original/pngtree-3d-vanilla-icecream-ice-cream-cone-on-transparent-background-png-image_17919357.png"},
  Chocolate:{protein:4.9,fat:30.0,fiber:7.0,carbs:61.0,calcium:56,calories:546,sugar:48.0,iron:8.0, img:"https://png.pngtree.com/png-clipart/20241223/original/pngtree-chocolate-bar-with-splash-on-a-transparent-background-png-image_18138025.png"},
  Donut:{protein:4.9,fat:25.0,fiber:1.5,carbs:51.0,calcium:21,calories:452,sugar:27.0,iron:2.1, img:"https://png.pngtree.com/png-clipart/20240811/original/pngtree-donut-with-pink-icing-isolated-on-transparent-background-png-image_15750982.png"},
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
let recommendationTimer;

function revealFoodImage(imageElement, imageUrl) {
  imageElement.classList.remove("food-image-reveal");
  imageElement.classList.add("food-image-loading");

  const preload = new Image();
  const reveal = () => {
    imageElement.src = imageUrl;
    requestAnimationFrame(() => {
      imageElement.classList.remove("food-image-loading");
      imageElement.classList.add("food-image-reveal");
    });
  };

  preload.onload = reveal;
  preload.onerror = reveal;
  preload.src = imageUrl;
}

function updateChart() {
  if (!food1.value || !food2.value) {
    alert("⚠️Please select both food items!");
    return;
  }
  document.body.classList.add("comparison-active");
  revealFoodImage(document.getElementById("img1"), foods[food1.value].img);
  revealFoodImage(document.getElementById("img2"), foods[food2.value].img);

  const data = {
    labels: [
      ["Protein", "(g)"], 
      ["Fat", "(g)"], 
      ["Fiber", "(g)"], 
      ["Carbs", "(g)"], 
      ["Calcium", "(mg/10)"],
      ["Calories", "(kcal/10)"], 
      ["Sugar", "(g)"], 
      ["Iron", "(mg)"]
    ],
    datasets: [
      {
        label: food1.value,
        data: [
          foods[food1.value].protein,
          foods[food1.value].fat,
          foods[food1.value].fiber,
          foods[food1.value].carbs,
          foods[food1.value].calcium / 10,
          foods[food1.value].calories / 10,
          foods[food1.value].sugar,
          foods[food1.value].iron
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
          foods[food2.value].calcium / 10,
          foods[food2.value].calories / 10,
          foods[food2.value].sugar,
          foods[food2.value].iron
        ],
        backgroundColor: "rgb(255, 0, 136)",
        hoverBackgroundColor: "rgb(255, 0, 170)"
      }
    ]
  };

  const chartCanvas = document.getElementById("chart");
  const compactChart = window.innerWidth < 768;
  if (chart) chart.destroy();
  chartCanvas.style.display = "block";
  chartCanvas.classList.remove("chart-reveal");
  void chartCanvas.offsetWidth;
  chartCanvas.classList.add("chart-reveal");

  chart = new Chart(chartCanvas, {
    type: "bar",
    data: data,
   options: {
      responsive: true,
     maintainAspectRatio: true, 
      aspectRatio: window.innerWidth < 768 ? 1.1 : 2.2,
      animation: {
        duration: 4200,
        easing: 'easeOutQuart'
      },
      animations: {
        y: {
          from: 0,
          duration: 4350,
          easing: 'easeOutQuart',
          delay(context) {
            return context.type === 'data'
              ? context.dataIndex * 120 + context.datasetIndex * 150
              : 0;
          }
        },
        opacity: {
          from: 0,
          duration: 360,
          easing: 'linear'
        }
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "white",
            font: { family: "Inter, sans-serif", size: compactChart ? 11 : 16 },
            boxWidth: compactChart ? 20 : 35,
            boxHeight: compactChart ? 3 : 4,
            padding: compactChart ? 8 : 20
          }
        },
        tooltip: { enabled: true }
      },
      scales: {
        x: {
          ticks: {
            autoSkip: false, 
            maxRotation: window.innerWidth < 768 ? 45 : 0, 
            minRotation: window.innerWidth < 768 ? 45 : 0, 
            color: "white",
            font: { size: window.innerWidth < 768 ? 10 : 14, family: "'Inter', sans-serif", weight: "bold" }
          }
        },
        y: {
          beginAtZero: true,
          ticks: { color: "white", font: { size: 15, family: "'Inter', sans-serif", weight: "bold" } }
        }
      }
    }
  });

  const f1 = foods[food1.value];
  const f2 = foods[food2.value];

  const score1 = (f1.protein + f1.fiber + (f1.calcium/20) + f1.iron) / (Math.max(f1.fat, 0.5) + (f1.carbs*0.1) + (f1.sugar*0.5) + (f1.calories/200));
  const score2 = (f2.protein + f2.fiber + (f2.calcium/20) + f2.iron) / (Math.max(f2.fat, 0.5) + (f2.carbs*0.1) + (f2.sugar*0.5) + (f2.calories/200));

  const best = score1 >= score2 ? food1.value : food2.value;

  clearTimeout(recommendationTimer);
  resultText.style.display = "none";
  resultText.classList.remove("live-pop");

  // Bars finish their live growth first, then the recommendation enters smoothly.
  recommendationTimer = setTimeout(() => {
    resultText.style.display = "block";
    resultText.innerHTML =
      "<span style='font-family:\"Times New Roman\",serif;color:white;'>" +
      "<img src='graph.gif' style='width:32px;height:32px;border-radius:10px;vertical-align:-1px;'>" +
      " Recommended food: " + best +
      "</span>" +
      "<img src='tickk.gif' style='width:48px;height:48px;vertical-align:-10px'>";
    void resultText.offsetWidth;
    resultText.classList.add("live-pop");
  }, 5500);
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



const slider = document.getElementById("logoutSlider");
const track = document.querySelector(".logout-track");
const logoutText = document.getElementById("logoutText");

if (parseInt(slider.style.left || 0) < 10) {

    logoutText.style.color = "#ffffff";
    logoutText.style.textShadow = "none";

}

let dragging = false;
let lastX = 0;


slider.style.touchAction = "none";

slider.addEventListener("pointerdown", (e) => {

    dragging = true;

    slider.setPointerCapture(e.pointerId);

    slider.style.cursor = "grabbing";

});

document.addEventListener("pointerup", () => {

    dragging = false;

    slider.style.cursor = "grab";

    window.getSelection().removeAllRanges();

});

document.addEventListener("pointermove", (e) => {

    if (!dragging) return;

    const rect = track.getBoundingClientRect();

    let x = e.clientX - rect.left - slider.offsetWidth / 2;

    x = Math.max(
        0,
        Math.min(
            x,
            rect.width - slider.offsetWidth
        )
    );

    slider.style.left = x + "px";

    if (x <= 5) {

        slider.style.boxShadow = "none";

        lastX = 0;

    } else if (x > lastX) {

        slider.style.boxShadow = `
            32px 0 32px rgb(255,0,0),
            55px 0 55px rgb(163,0,0)
        `;

    } else {

        slider.style.boxShadow = `
            -32px 0 32px rgb(4,255,0),
            -55px 0 55px rgb(0,137,0)
        `;
    }

    lastX = x;

    const progress =
        x /
        (rect.width - slider.offsetWidth);

    if (progress < 0.45) {

        logoutText.innerHTML = `
            <span style="color:white;">SIGN</span>
            <span style="color:white;">OUT</span>`;

    } else if (progress < 0.80) {

        logoutText.innerHTML = `
            <span style="color:#ff0000;text-shadow:0 0 15px red;">SIGN</span>
            <span style="color:white;">OUT</span>`;

    } else {

        logoutText.innerHTML = `
            <span style="color:#ff0000;text-shadow:0 0 15px red;">SIGN</span>
            <span style="color:#ff0000;text-shadow:0 0 15px red;">OUT</span>`;
    }

    if (
        x >=
        rect.width - slider.offsetWidth - 1
    ) {

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        document
            .getElementById("pageContent")
            .classList
            .add("hide-page");

        setTimeout(() => {

            document
                .getElementById("logoutModal")
                .style.display = "flex";

        }, 120);
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

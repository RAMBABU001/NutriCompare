async function signup() {

  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  // Validation
  if(name === "" || email === "" || password === ""){

    alert("Please fill all fields");

    return;
  }

  // Email validation
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  if(!emailPattern.test(email)){

    alert("Please enter a valid email");

    return;
  }

  // Password validation
  // Minimum 6 chars + alpha numeric
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  if(!passwordPattern.test(password)){

    alert("Password must contain alphabets and numbers and be at least 6 characters long");

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



async function login() {

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  // Validation
  if(email === "" || password === ""){

    alert("Please fill all fields");

    return;
  }

  // Email validation
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  if(!emailPattern.test(email)){

    alert("Please enter a valid email");

    return;
  }

  // Password validation
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

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

    window.location.href = "home.html";
  }
  else{

    alert("Please enter valid credentials");
  }
}
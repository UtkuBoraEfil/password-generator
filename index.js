const checkboxText = document.querySelectorAll(".checkboxvalue");
const slider = document.getElementById("myRange");
// let uppercase = document.querySelectorAll("input[type=checkbox]");
const checkbox = document.querySelectorAll(".inputs");
const button= document.querySelector(".button button");
const password= document.querySelector(".password");
const password_strength=document.querySelector(".bar p");
const copy=document.querySelector(".copy");
const bar1=document.querySelector(".bar1");
const bar2=document.querySelector(".bar2");
const bar3=document.querySelector(".bar3");
const bar4=document.querySelector(".bar4");


console.log(checkbox);
// console.log(uppercase);
checkboxText[0].innerHTML = slider.value;

slider.oninput = function () {
  console.log("aaaaa");
  checkboxText[0].innerHTML = this.value;
  let filter = check_boxes();
  generate(filter, slider.value);
};

function checkAll() {
  const isError = Array.from(checkbox).every((box) => {
    return box.checked === false;
  });
  return isError;
}
function check_boxes() {
  const filter = Array.from(checkbox).filter((box) => {
    return box.checked === true;
  });
  return filter;
}

function strength(box, slider_value){
  let slider_point;
  let box_point = box.length;
  if(slider_value>75){
    slider_point=4;
  }  
  else if(slider_value>50){
    slider_point=3;
  }
  else if(slider_value>25){
    slider_point=2
  }
  else if(slider_value>10){
    slider_point=1
  }
  else{
    slider_value=0
  }
  slider_point+=box_point;
  if(slider_point>5){
    bar1.classList.add("strong");
    bar2.classList.add("strong");
    bar3.classList.add("strong");
    bar4.classList.add("strong");
    password_strength.innerHTML="STRONG";

    console.log(slider_point);
  }
  else if(slider_point>4){
    bar1.classList.add("medium");
    bar2.classList.add("medium");
    bar3.classList.add("medium");
    password_strength.innerHTML="MEDIUM";
  }
  else if(slider_point>3){
    bar1.classList.add("week");
    bar2.classList.add("week");
    password_strength.innerHTML="WEEK";
  }
  else{
    bar1.classList.add("tooWeek");
    password_strength.innerHTML="TOO WEEK";
  }


}

function error_function() {
  alert("zort");
  toastr.info('Are you the 6 fingered man?');
}

function generate(box, slider_value) {
  bar1.classList.remove("medium","strong","week", "tooWeek");
  bar2.classList.remove("medium","strong","week", "tooWeek");
  bar3.classList.remove("medium","strong","week", "tooWeek");
  bar4.classList.remove("medium","strong","week", "tooWeek");
  console.log("new array: ", box, "slider value: ", slider_value);
  const numbers = "0123456789";
  const lowercase = "qwertyuiopasdfghjklzxcvbnm";
  const uppercase = "QWERTYUIOPASDFGHJKZXCVBNM";
  let mix = "";
  let generated = "";
  const symbols = "!@£$%^&*_-|>,<";
  console.log("from outside", box);
  console.log("outside length", box.length);
  for (i = box.length; i > 0; i--) {
    console.log("lentgth", i);
    console.log("from inside", box);
    console.log(`box[${i - 1}]`);
    if ("uppercase" === box[i - 1].id) {
      mix = mix + uppercase;
    }
    if ("lowercase" === box[i - 1].id) {
      console.log("trueeeee");
      mix = mix + lowercase;
    }
    if ("numbers" === box[i - 1].id) {
      mix = mix + numbers;
    }
    if ("symbols" === box[i - 1].id) {
      mix = mix + symbols;
    }
  }
  for (n = 0; slider_value > n; n++) {
    let m = Math.floor(Math.random() * mix.length);
    generated += mix[m];
  }
  console.log(slider_value);
  console.log(generated);
  strength(box,slider_value);
  password.innerHTML=generated;
}

checkbox.forEach((box) => {
  box.addEventListener("change", () => {
    console.log("checked", box.id, box.checked);
    const isError = checkAll();
    if (isError) {
      box.checked = !box.checked;
      error_function();
    }
    else{
      const filter = check_boxes();
    generate(filter, slider.value);
    }
  });
});

button.addEventListener("click", ()=>{
  let filter = check_boxes();
  generate(filter, slider.value);
});


copy.addEventListener("click", ()=>{
  document.querySelector(".password").select();
  document.execCommand("copy");
  console.log(password.textContent);
});
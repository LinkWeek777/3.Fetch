const btn = document.querySelector('.btn');
const loader = document.querySelector('.loader');

function hideLoader() {
  loader.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
}

function changeBackground(gender) {
  if (gender === 'male') {
    document.body.style.background = '#1a00c1';
  } else {
    document.body.style.background = '#e700b5';
  }
}

function getData(user) {
  const pic = user.picture.large;
  const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
  const email = user.email;
  const phone = user.phone;
  const loc = user.location.city + ', ' + user.location.country;
  const age = user.dob.age;
  const gender = user.gender;

  changeBackground(gender);
  showData(pic, name, email, phone, loc, age, gender);
}

function fetchData() {
  showLoader();
  fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      hideLoader();
      getData(data.results[0]);
    });
}

function showData(newImage, newName, newEmail, newPhone, newLoc, newAge) {
  const divData = document.querySelector('.data');
  const divImg = document.querySelector('.img');

  // Clear previous content
  divData.innerHTML = '';
  divImg.innerHTML = '';

  // Create elements
  const name = document.createElement('p');
  const email = document.createElement('p');
  const phone = document.createElement('p');
  const loc = document.createElement('p');
  const age = document.createElement('p');

  // Set content
  name.innerHTML = `<strong>Name:</strong> ${newName}`;
  email.innerHTML = `<strong>Email:</strong> ${newEmail}`;
  phone.innerHTML = `<strong>Phone:</strong> ${newPhone}`;
  loc.innerHTML = `<strong>Location:</strong> ${newLoc}`;
  age.innerHTML = `<strong>Age:</strong> ${newAge}`;
  const image = document.createElement('img');
  image.setAttribute('src', newImage);

  // Append elements to respective containers
  divData.appendChild(name);
  divData.appendChild(email);
  divData.appendChild(phone);
  divData.appendChild(loc);
  divData.appendChild(age);
  divImg.appendChild(image);
}

function main() {
  btn.addEventListener('click', fetchData);
  document.addEventListener('DOMContentLoaded', fetchData);
}

main();

"use strict";

//Sparar kurserna globalt så jag kan sortera dem sen
let kursSchema = [];
//När hela HTML-dokumntet laddats så körs loadCourses
document.addEventListener("DOMContentLoaded", () => {
  loadCourses(); //Hämtar kurser så jag kan skriva ut dem i tabellen

//Händelselyssnare för sortering för kurskoden, kursnamnet och progressionen
document.querySelector("#sortCode").addEventListener("click", ()=> {
const sortedByCode = [...kursSchema].sort((a, b) => a.code.localeCompare(b.code));
fillTable(sortedByCode); //Skickar resultatet till tabellen
});
document.querySelector("#sortName").addEventListener("click", ()=> {
const sortedByName = [...kursSchema].sort((a, b) => a.coursename.localeCompare(b.coursename));
fillTable(sortedByName);
});
document.querySelector("#sortProgression").addEventListener("click", ()=> {
const sortedByProgression = [...kursSchema].sort((a, b) => a.progression.localeCompare(b.progression));
fillTable(sortedByProgression);
});
});

//Här gör jag en fetch på API/kursdatan och ser till så att det returneras som javascript
async function fetchCourses() {
  const response = await fetch('https://webbutveckling.miun.se/files/ramschema.json');
  if (!response.ok) { //Kollar så servern svarar ok
    throw new Error('Kan inte hämta kursdata'); //Om servern inte svarar ok så skrivs detta ut
    }
    return await response.json(); //Svaret görs om till javascript-objekt
}

//Här hämtar jag datan så att jag kan skriva ut tabellen sen
async function loadCourses() {
  try {
    const data = await fetchCourses(); //Hämtar kurser från dokumentet
    fillTable(data);                    //Datan skickas till tabellen
  
    kursSchema = data;  //Sparar kurserna globalt

  }
  catch (error) {
    console.error ("Det uppstod ett fel:", error.message);
  }
}

//Funktion för att skapa rader i tabellen och fylla med data
function fillTable(courses) {
const tbody = document.querySelector("#courses tbody");
tbody.innerHTML =""; //Rensar gamla raderna

//Gör en loop för varje kurs och skapar en rad i tabellen
courses.forEach(course => {
const tr = document.createElement("tr");
tr.innerHTML = `
<td>${course.code}</td>
<td>${course.coursename}</td>
<td>${course.progression}</td>
`;
tbody.appendChild(tr); //Lägger till raden i tabellen så att den syns
});
}





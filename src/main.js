"use strict";

//När hela HTML-dokumntet laddats så körs loadCourses
document.addEventListener("DOMContentLoaded", loadCourses);

//Här gör jag en fetch på API/kursdatan och ser till så att det returneras som javascript
async function fetchCourses() {
  const response = await fetch('https://webbutveckling.miun.se/files/ramschema.json');
  if (!response.ok) { //Kollar så servern svarar ok
    throw new Error('Kan inte hämta kursdata');
    }
    return await response.json(); //Svaret görs om till javascript-objekt
}

//Här hämtar jag datan så att jag kan skriva ut tabellen sen
async function loadCourses() {
  try {
    const data = await fetchCourses(); //Hämtar kurser från dokumentet
    fillTable(data);                    //Datan skickas till tabellen
  }
  catch (error) {
    console.error ("Det uppstod ett fel:", error.message);
  }
}

//Funktion för att skapa rader i tabellen och fylla med data
function fillTable(courses) {
const table = document.getElementById("courses");
table.innerHTML = `
<thead>
<tr>
<th>Kurskod</th>
<th>Namn</th>
<th>Progression</th>
</tr>
</thead>
<tbody></tbody>`;

const tbody = table.querySelector("tbody")

//Gör en loop för varje kurs och skapar en rad i tabellen
courses.forEach(course => {
const tr = document.createElement("tr");
tr.innerHTML = `
<td>${course.code}</td>
<td>${course.coursename}</td>
<td>${course.progression}</td>
`;
tbody.appendChild(tr); //lägger till raden i tabellen så att den syns
});
}





let students = [];
let filteredStudents = [];

// Fetch JSON
fetch("students.json")
  .then((res) => res.json())
  .then((data) => {
    students = data;
    filteredStudents = [...students];
    renderTable(filteredStudents);
  });

function renderTable(data) {
  const container = document.getElementById("tables-container");

  // Reset to single table view
  container.innerHTML = `
    <table id="studentTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>Gender</th>
          <th>Class</th>
          <th>Marks</th>
          <th>Passing</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody id="tableBody"></tbody>
    </table>
  `;

  const tableBody = document.getElementById("tableBody");

  data.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>
        <div class="student-info">
          <img src="${student.img_src}" alt="${student.first_name}" />
          <span>${student.first_name} ${student.last_name}</span>
        </div>
      </td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passing" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    tableBody.appendChild(row);
  });
}
// Search
document.getElementById("searchBtn").addEventListener("click", handleSearch);
document.getElementById("searchInput").addEventListener("input", handleSearch);

function handleSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  filteredStudents = students.filter(
    (s) =>
      s.first_name.toLowerCase().includes(query) ||
      s.last_name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query)
  );
  renderTable(filteredStudents);
}
// Sorting Functions
function sortAZ() {
  filteredStudents.sort((a, b) =>
    (a.first_name + " " + a.last_name).localeCompare(b.first_name + " " + b.last_name)
  );
  renderTable(filteredStudents);
}

function sortZA() {
  filteredStudents.sort((a, b) =>
    (b.first_name + " " + b.last_name).localeCompare(a.first_name + " " + a.last_name)
  );
  renderTable(filteredStudents);
}

function sortByMarks() {
  filteredStudents.sort((a, b) => a.marks - b.marks);
  renderTable(filteredStudents);
}

function sortByPassing() {
  filteredStudents = students.filter((s) => s.passing);
  renderTable(filteredStudents);
}
function sortByClass() {
  filteredStudents.sort((a, b) => a.class - b.class);
  renderTable(filteredStudents);
}
function sortByGender() {
  const males = students.filter((s) => s.gender === "Male");
  const females = students.filter((s) => s.gender === "Female");
  const container = document.getElementById("tables-container");
  container.innerHTML = "";
  // Female Table
  container.innerHTML += `
    <h2>Female Students</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>Gender</th>
          <th>Class</th>
          <th>Marks</th>
          <th>Passing</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        ${females
          .map(
            (s) => `
          <tr>
            <td>${s.id}</td>
            <td><div class="student-info"><img src="${s.img_src}" /><span>${s.first_name} ${s.last_name}</span></div></td>
            <td>${s.gender}</td>
            <td>${s.class}</td>
            <td>${s.marks}</td>
            <td>${s.passing ? "Passing" : "Failed"}</td>
            <td>${s.email}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
  // Male Table
  container.innerHTML += `
    <h2>Male Students</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>Gender</th>
          <th>Class</th>
          <th>Marks</th>
          <th>Passing</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        ${males
          .map(
            (s) => `
          <tr>
            <td>${s.id}</td>
            <td><div class="student-info"><img src="${s.img_src}" /><span>${s.first_name} ${s.last_name}</span></div></td>
            <td>${s.gender}</td>
            <td>${s.class}</td>
            <td>${s.marks}</td>
            <td>${s.passing ? "Passing" : "Failed"}</td>
            <td>${s.email}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

const btn = document.getElementById("get-users");
const box = document.getElementById("users-box");
const reload = document.getElementById("reload");
const input = document.getElementById("input");
const age = document.getElementById("age");
const sort = document.getElementById("sort");
let users;


btn.addEventListener("click", async () => {
    const javob = await fetch("https://randomuser.me/api/?results=100");
    users = await javob.json();
    usersView(users.results)
})


function usersView(odamlar) {

    console.log(odamlar[0]);

    box.innerHTML = '';
    odamlar.forEach(odam => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
         <img src="${odam.picture.large}"
                    alt="odam">
                <h2>${odam.name.title} ${odam.name.first} ${odam.name.last}</h2>
                <h3>Email: ${odam.email}</h3>
                <h3>Age: ${odam.dob.age}</h3>
                <h3>Address: ${odam.location.street.name}  ${odam.location.street.number}</h3>
                <h3>Phone: ${odam.phone}</h3>
        `;
        box.appendChild(div);
    })
}

reload.addEventListener("click", () => {
    location.reload();
})

input.addEventListener("input", () => {
    const searchPerson = users.results.filter((odam) =>
        odam.name.first.toLowerCase().includes(input.value.toLowerCase().trim()) ||
        odam.name.last.toLowerCase().includes(input.value.toLowerCase().trim())
    );
    usersView(searchPerson);
});
age.addEventListener("change", () => {
    if (age.value == "All") {
        usersView(users);
    } else if (age.value == "15-25") {
        const filterAgeData = users.results.filter(odam => odam.dob.age >= 15 && odam.dob.age <= 25);
        usersView(filterAgeData)
    } else if (age.value == "25-40") {
        const filterAgeData = users.results.filter(odam => odam.dob.age >= 25 && odam.dob.age <= 40);
        usersView(filterAgeData)
    } else if (age.value == "40-60") {
        const filterAgeData = users.results.filter(odam => odam.dob.age >= 40 && odam.dob.age <= 60);
        usersView(filterAgeData)
    } else if (age.value == "60-...") {
        const filterAgeData = users.results.filter(odam => odam.dob.age >= 60 && odam.dob.age <= 100);
        usersView(filterAgeData)
    }
})

sort.addEventListener("click", () => {
    if (sort.value == "A-Z") {
        users.results.sort((a, b) => a.name.first.localeCompare(b.name.first));
        usersView(users.results);
    } else {
        users.results.sort((a, b) => b.name.first.localeCompare(a.name.first));
        usersView(users.results);
    }
});
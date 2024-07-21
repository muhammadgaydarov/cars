const btn = document.querySelector(".add-btn")
const clearBtn = document.querySelector(".btn-clear")
const editBtn = document.querySelector("edit-btn")
const saveBtn = document.querySelector(".save-btn")
const addNewBtn = document.querySelector(".add-new-btn")
const input = document.querySelector(".input")
const resultDiv = document.querySelector(".result")
const carsCount = document.querySelector(".car-count")


let carInfo = [
   {
   marka: 'BMW',
   model: 'M5',
   year: 2022,
   color: 'black'
   },
   {
   marka: 'Mercedes',
   model: 'cls',
   year: 2020,
   color: 'red'
   },
   {
   marka: 'AUDI',
   model: 'R8',
   year: 2024,
   color: 'white'
   },
   {
   marka: 'Porsche',
   model: '911',
   year: 2019,
   color: 'silver'
   },
   {
   marka: 'Toyota',
   model: 'kamri 55',
   year: 2019,
   color: 'black'
   }
]

localStorage.setItem('carInfo', JSON.stringify(carInfo))
let savedCarInfo = localStorage.getItem('carInfo')
let carInfoObject = JSON.parse(savedCarInfo)


btn.addEventListener("click", () => {
  const SearchInput = input.value.toLowerCase();

  const foundCar = carInfoObject.find((car) =>
    car.marka.toLowerCase() === SearchInput ||
    car.model.toLowerCase() === SearchInput
  );

  if (foundCar) {
    resultDiv.innerHTML = ""
    const carInfoHTML = `
      <h2>Найдена машина:</h2>
      <p>Марка: ${foundCar.marka}</p>
      <p>Модель: ${foundCar.model}</p>
      <p>Год: ${foundCar.year}</p>
      <p>Цвет: ${foundCar.color}</p>
      <button class="edit-btn" data-car-index="${carInfoObject.indexOf(foundCar)}">Изменить</button>`
    ;
    resultDiv.innerHTML = carInfoHTML

    clearBtn.style.display = "block"

    const editBtn = document.querySelector(".edit-btn")
    editBtn.addEventListener("click", (event) => {
      const carIndex = event.target.dataset.carIndex;
      editCar(carIndex)
    });
  } else {
    resultDiv.innerHTML = "<p>Машина не найдена.</p>"
  }
});

function editCar(carIndex) {
  const car = carInfoObject[carIndex]
  const editForm = `
    <h2>Изменить машину</h2>
    <label for="editMarka">Марка:</label>
    <input type="text" id="editMarka" value="${car.marka}"><br>
    <label for="editModel">Модель:</label>
    <input type="text" id="editModel" value="${car.model}"><br>
    <label for="editYear">Год:</label>
    <input type="number" id="editYear" value="${car.year}"><br>
    <label for="editColor">Цвет:</label>
    <input type="text" id="editColor" value="${car.color}"><br>
    <button class="save-btn" data-car-index="${carIndex}">Сохранить</button>`
  


  resultDiv.innerHTML = editForm; 

  const saveBtn = document.querySelector(".save-btn")
  saveBtn.addEventListener("click", (event) => {
    const carIndex = event.target.dataset.carIndex
    const newMarka = document.getElementById("editMarka").value
    const newModel = document.getElementById("editModel").value
    const newYear = parseInt(document.getElementById("editYear").value)
    const newColor = document.getElementById("editColor").value

    carInfoObject[carIndex] = {
      marka: newMarka,
      model: newModel,
      year: newYear,
      color: newColor,
    }

    localStorage.setItem("carInfo", JSON.stringify(carInfoObject))

    displayCarInfo(carInfoObject[carIndex])
  })
}

function deleteCar(carIndex) {
  carInfoObject.splice(carIndex, 1)

  localStorage.setItem("carInfo", JSON.stringify(carInfoObject))

  resultDiv.innerHTML = ""

  resultDiv.innerHTML = "<p>Машина успешно удалена.</p>"

  clearBtn.style.display = "none"

  carInfoObject = JSON.parse(localStorage.getItem('carInfo'))
}

function displayCarInfo(car) {
  const carInfoHTML = `
    <h2>Найдена машина:</h2>
    <p>Марка: ${car.marka}</p>
    <p>Модель: ${car.model}</p>
    <p>Год: ${car.year}</p>
    <p>Цвет: ${car.color}</p>
    <button class="edit-btn" data-car-index="${carInfoObject.indexOf(car)}">Изменить</button>`
  

  resultDiv.innerHTML = carInfoHTML
}

clearBtn.addEventListener("click", () => {
  input.value = ""
  resultDiv.innerHTML = ""
  clearBtn.style.display = "none"
});

addNewBtn.addEventListener("click", () => {
  const addNewForm = `
  <h2>Добавить новую машину</h2>
  <label for="newMarka">Марка:</label>
  <input type="text" id="newMarka"><br>
  <label for="newModel">Модель:</label>
  <input type="text" id="newModel"><br>
  <label for="newYear">Год:</label>
  <input type="number" id="newYear"><br>
  <label for="newColor">Цвет:</label>
  <input type="text" id="newColor"><br>
  <button class="save-new-btn">Сохранить</button>
  `
  resultDiv.innerHTML = addNewForm

  const saveNewBtn = document.querySelector(".save-new-btn")
  saveNewBtn.addEventListener("click", () => {
    const newMarka = document.getElementById("newMarka").value;
    const newModel = document.getElementById("newModel").value;
    const newYear = parseInt(document.getElementById("newYear").value);
    const newColor = document.getElementById("newColor").value

    carInfoObject.push({
          marka: newMarka,
          model: newModel,
          year: newYear,
          color: newColor
    })

    localStorage.setItem("carInfo", JSON.stringify(carInfoObject))
    resultDiv.innerHTML = ""
    resultDiv.innerHTML = "<p>Машина успешно добавлена"
  })
})
const loadMealData = async (search) => {
  console.log(search);
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  displayMeals(data.meals);
};

// get search value
const searchValue = () => {
  const inputField = document.getElementById("searchInput");
  const search = inputField.value;
  loadMealData(search);
};

// Display Meals
const displayMeals = (data) => {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  if (!data) {
    mainContent.innerHTML = `
        <h2 class="font-bold text-3xl text-center">404! Data not found</h2>
    `;
    return;
  }
  data.slice(0, 6).forEach((meal) => {
    const { idMeal, strInstructions, strMeal, strMealThumb } = meal;
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
            <div>
              <img class="rounded-md" src="${strMealThumb}" alt="" />
            </div>
            <div>
              <h3 class="font-bold">${strMeal}</h3>
              <p class="text-gray-400 "> ${strInstructions.slice(0, 200)}
              </p>
              <button onclick="displayModal('${idMeal}')" href="#" class="text-yellow-500">View Details</button>
            </div>
          </div>
    
    `;
    mainContent.append(div);
  });
};

// show modal with meal information

const displayModal = async (id) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  console.log(data);

  const {
    strArea,
    strCategory,
    strMealThumb,
    strInstructions,
    strMeal,
    strYoutube,
  } = data.meals[0];
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
            <form method="dialog" class="flex justify-between px-2 mb-3">
                <h3 class="font-bold">${strMeal}</h3> 
                <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
              <img class="w-full aspect-square h-48 object-cover rounded-lg" src="${strMealThumb}">
              <p class="py-4"><span class="font-bold">Category:</span> ${strCategory}</p>
              <p class="py-4"><span class="font-bold">Area:</span> ${strArea}</p>
              <p class="py-4"><span class="font-bold">Instructions:</span> ${strInstructions}</p>
              <p class="py-4"><span class="font-bold">Youtube:</span> ${strYoutube}</p>

               <form method="dialog" class="flex justify-end">
                    <button class="btn btn-error">Close</button>
               </form>
              </div>
              </dialog>
               
              `;
  my_modal_3.showModal();
};

loadMealData("chicken");

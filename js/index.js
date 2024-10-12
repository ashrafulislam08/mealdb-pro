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
    const { strInstructions, strMeal, strMealThumb } = meal;
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="flex items-center gap-2 mb-2">
            <div>
              <img class="rounded-md" src="${strMealThumb}" alt="" />
            </div>
            <div>
              <h3 class="font-bold mb-5">${strMeal}</h3>
              <p class="text-gray-400 mb-5"> ${strInstructions.slice(0, 200)}
              </p>
              <a href="#" class="text-yellow-500">View Details</a>
            </div>
          </div>
    
    `;
    mainContent.append(div);
  });
};

loadMealData("Arrabiata");

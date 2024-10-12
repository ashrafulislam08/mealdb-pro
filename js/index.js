const getDataBySearch = async (search) => {
  const url = `www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`;
  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  console.log(data);
};

getDataBySearch();

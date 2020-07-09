export class API {

    async getDrinkByName(name) {

        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
        const apiResponse = await fetch(url);
        const response = await apiResponse.json();
        return {
            response
        };
    }

    async getDrinksByIngredients(ingredients) {

        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`;

        const fetchData = await fetch(url);
        const responseData = await fetchData.json();
        return {
            responseData
        };
    }

    async getSingleRecipeByID(recipeID) {

        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
        const fetchData = await fetch(url);
        const response = await fetchData.json();

        return {
            response
        };
    }

    async getCocktailBycategory() {

        const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
        const fetchResponse = await fetch(url);
        const response = await fetchResponse.json();
        return {
            response
        };
    }

    async getCategoryByID(category) {

        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
        console.log(url);
        const fetchResponse = await fetch(url);
        const response = await fetchResponse.json();
        return {
            response
        };
    }

    async getByAlcohol(item) {

        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${item}`;
        console.log(url);
        const fetchResponse = await fetch(url);
        const response = await fetchResponse.json();
        return {
            response
        };
    }
}
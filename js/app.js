import * as UI from './UI.js';
import * as API from './CocktailAPI.js';
import * as DBstorage from './CocktailDB.js';

const myApi = new API.API();
const myUI = new UI.UI();
const myStorage = new DBstorage.CocktailDB();

let messages = "";
const searchForm = document.querySelector("#search-form");
const tblFavourite = document.querySelector('#favorites');

function eventListeners() {

    /**
     * Write an internet availability checker to 
     * check the internet
     */

    const result = document.querySelector("#results");

    if (searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }

    if (result) {
        result.addEventListener('click', resultDelegation);
    }
    document.addEventListener('DOMContentLoaded', displayCategories);
}

eventListeners();

function getCocktails(e) {

    e.preventDefault();

    const searchValues = document.querySelector("#search").value.trim();

    console.log(searchValues);

    if (searchValues.trim() === "") {

        messages = "Provide the required cocktail name";
        myUI.displayMessage(messages, 'danger');

    } else {

        const searchTypes = document.querySelector("#type").value;

        switch (searchTypes) {

            case "name":

                myApi.getDrinkByName(searchValues)
                    .then(function(data) {

                        const responseData = data.response.drinks;

                        if (responseData === null) {

                            messages = "Cocktail not found. Please try difference term to get the required result";
                            myUI.displayMessage(messages, 'danger');

                        } else {
                            myUI.displayApiResultbySearchTerms(responseData);
                        }
                    }).catch(function(err) {
                        console.log(err);
                    });
                break;

            case "ingredient":

                myUI.clearResult();

                myApi.getDrinksByIngredients(searchValues)
                    .then(function(idata) {

                        const response = idata.responseData.drinks;

                        if (response === null) {
                            myUI.displayMessage("No result found ", "danger");
                        } else {

                            if (searchTypes === "name") {
                                //display with ingrediant
                                myUI.displayIngrediants(response);
                            } else {
                                //display without ingredients
                                myUI.displayDrink(response);
                            }
                        }

                    }).catch(function(err) {
                        console.log(err);
                    });
                break;
            case "category":

                myApi.getCategoryByID(searchValues)
                    .then(function(data) {

                        const response = data.response.drinks;
                        if (response === null) {
                            myUI.displayMessage("No result found ", "danger");
                        } else {

                            if (searchTypes === "name") {
                                //display with ingrediant
                                myUI.displayIngrediants(response);
                            } else {
                                //display without ingredients
                                myUI.displayDrink(response);
                            }
                        }

                    }).catch(function(err) {
                        console.log(err);
                    });
                break;

            case "alcohol":
                myApi.getByAlcohol(searchValues)
                    .then(function(data) {

                        const response = data.response.drinks;
                        if (response === null) {
                            myUI.displayMessage("No result found ", "danger");
                        } else {

                            if (searchTypes === "name") {
                                //display with ingrediant
                                myUI.displayIngrediants(response);
                            } else {
                                //display without ingredients
                                myUI.displayDrink(response);
                            }
                        }
                    }).catch(function(err) {
                        console.log(err);
                    });
                break;

            default:
                console.log("Dfault content goes here");
                break;
        }
    }
}

function resultDelegation(e) {

    e.preventDefault();

    if (e.target.classList.contains("get-result-recipe")) {

        const cocktailID = e.target.dataset.id;
        //alternative
        const cockttail = e.target.getAttribute("data-id");

        myApi.getSingleRecipeByID(cocktailID)
            .then(function(edata) {

                const ingredient = edata.response.drinks[0];
                myUI.diplaySingleRecipe(ingredient);

            }).catch(function(err) {
                console.log(err);
            });
    }

    if (e.target.classList.contains("favorite-btn")) {

        if (e.target.classList.contains("is-favorite")) {
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
        } else {
            e.target.classList.add("is-favorite");
            e.target.textContent = '-';

            //get items from the cardBoard div/control
            const cardRecord = e.target.parentElement;
            let drinkInfo;

            if (cardRecord) {

                drinkInfo = {
                    id: e.target.dataset.id,
                    name: cardRecord.querySelector(".card-title").textContent,
                    image: cardRecord.querySelector(".card-img-top").src
                };

                myStorage.saveDrinks(drinkInfo);

                if (myStorage.getSize() > 0) {

                    alert("record has been saved ");
                }
                console.log(myStorage.getSize());

            }
        }
    }
}

function displayCategories() {

    myApi.getCocktailBycategory()
        .then(function(category) {

            const record = category.response.drinks;
            myUI.displayAllCategories(record);

        }).catch(function(err) {
            console.log(err);
        });

    const tblFavourite = document.querySelector('#favorites');

    if (tblFavourite) {

        if (myStorage.getSize() > 1) {
            const getFavorites = myStorage.getDrinks();
            myUI.displayALlFovirites(getFavorites);
        } else {
            alert("No favorite cocktail ");
        }
    }

    /**
     * Use delegation to get control dynmaically generated on the page
     * with the scripts
     */

    tblFavourite.addEventListener('click', function(e) {

        e.preventDefault();

        if (e.target.classList.contains('get-recipe')) {

            const cocktailID = e.target.dataset.id;

            if (!isNaN(cocktailID) && cocktailID > 0) {

                myApi.getSingleRecipeByID(cocktailID)
                    .then(function(edata) {

                        const ingredient = edata.response.drinks[0];
                        myUI.diplaySingleRecipe(ingredient);

                    }).catch(function(err) {
                        console.log(err);
                    });

            } else {

                console.log("record om the page");
                console.log("Oops, Cocktial not found");
            }
        } else if (e.target.classList.contains("remove-recipe")) {

            if (confirm("Do you want to remove this recipe from your favorite list ?")) {

                const tableRow = e.target.parentElement.parentElement;

                if (tableRow) {

                    myUI.removeFavoriteItem(tableRow);
                    //remove from the local storage 
                    const idIngredient = e.target.dataset.id;
                    console.log(idIngredient);
                    myStorage.removeFavoriteStorage(idIngredient);
                }
            }
        }
    });
}
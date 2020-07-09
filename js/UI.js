const contentHolder = document.querySelector(".show-me");
const resultApi = document.querySelector("#results");
const select = document.querySelector(".search_category");
const favoriteTable = document.querySelector("#favorites tbody");


export class UI {

    clearResult() {
        resultApi.innerHTML = '';
    }

    displayMessage(message, className) {

        const divField = document.createElement("div");

        divField.innerHTML = `
          <div class='alert alert-dismissible alert-${className}'>
             <button type="button" class="close" data-dismiss="alert">x</button>
             ${message}
          </div>`;

        contentHolder.appendChild(divField);

        setTimeout(function() {

            if (document.querySelector(".alert")) {
                document.querySelector(".alert").remove();
            } else {
                document.querySelector(".alert").remove();
            }
        }, 3000);
    }

    displayApiResultbySearchTerms(data) {

        const displayResult = document.querySelector(".results-wrapper");
        displayResult.style.display = 'block';

        data.forEach((recdata) => {

            resultApi.innerHTML += `<div class="col-md-6">
            <div class="card my-3">
                 <button type="button" data-id="${recdata.idDrink}" class="favorite-btn btn btn-outline-info">
                 +
                 </button>
                 <img class="card-img-top" src="${recdata.strDrinkThumb}" alt="${recdata.strDrink}">
                 <div class="card-body">
                      <h2 class="card-title text-center">${recdata.strDrink}</h2>
                      <p class="card-text font-weight-bold">Instructions: </p>
                      <p class="card-text">
                            ${recdata.strInstructions}
                      </p>
                      <p class="card-text">
                           <ul class="list-group">
                                <li class="list-group-item alert alert-danger">Ingredients</li>
                                ${this.displayIngrediants(recdata)}
                           </ul>
                      </p>
                      <p class="card-text font-weight-bold">Extra Information:</p>
                      <p class="card-text">
                           <span class="badge badge-pill badge-success">
                                ${recdata.strAlcoholic}
                           </span>
                           <span class="badge badge-pill badge-warning">
                                Category: ${recdata.strCategory}
                           </span>
                      </p>
                 </div>
            </div>
       </div>`;
        });
    }

    displayIngrediants(data) {

        let arrayElement = [];

        for (let i = 1; i < 16; i++) {

            const arrayObject = {};

            if (data[`strIngredient${i}`] !== null) {
                arrayObject.ingredient = data[`strIngredient${i}`];
                arrayObject.measure = data[`strMeasure${i}`];
                arrayElement.push(arrayObject);
            }
        }

        let ingrediantTemplate = '';

        arrayElement.forEach((data) => {
            ingrediantTemplate += `<li class="list-group-item">${data.ingredient} :  ${data.measure}</li>`;
        });

        return ingrediantTemplate;
    }

    displayDrink(itemsData) {

        console.log(itemsData);
        const displayResult = document.querySelector(".results-wrapper");
        displayResult.style.display = 'block';

        /**
         * provide a spinner to show progress for the content on the page
         */

        itemsData.forEach((drinks) => {

            resultApi.innerHTML += `<div class="col-md-4">
                  <div class="card my-3">
                  <button type="button" data-id="${drinks.idDrink}" class="favorite-btn btn btn-outline-info">
                  +
                  </button>
                     <img class="card-img-top" src="${drinks.strDrinkThumb}" alt="${drinks.strDrink}"> 
                      <div class="card-body">
                      <h2 class="card-title text-center">${drinks.strDrink}</h2>
                      <a href="#" class="btn get-result-recipe btn-info btn-block" 
                         data-toggle="modal" data-target="#recipe" 
                         data-id="${drinks.idDrink}">Get Recipe</a>
                    </div>
                 </div> 
            </div>`;
        });
    }

    diplaySingleRecipe(data) {

        const cocktailTitle = document.querySelector(".modal-title"),
            cocktailInstruction = document.querySelector('.instruction'),
            modalIngredients = document.querySelector(".modal-body .ingredient-list .list-group");

        cocktailTitle.innerHTML = `${data.strDrink}`;
        cocktailInstruction.innerHTML = `${data.strInstructions}`;

        let ingredientData = this.displayIngrediants(data);
        modalIngredients.innerHTML = ingredientData;
    }

    displayAllCategories(record) {

        let option = document.createElement("option");
        option.textContent = '-- Select Category --';
        option.value = " ";

        if (select) {


            select.appendChild(option);

            record.forEach(function(items) {
                let optionTwo = document.createElement("option");
                optionTwo.textContent = items.strCategory;
                optionTwo.value = items.strCategory;
                select.appendChild(optionTwo);
            });
        }
    }

    displayALlFovirites(record) {

        let option = "";

        if (record.length > 0) {

            const favoriteTable = document.querySelector("#favorites tbody");

            record.forEach(function(erecord) {

                favoriteTable.innerHTML += `<tr>
                  <td><img src="${erecord.image}" data-id="${erecord.id}"  width="100"></td>
                  <td>${erecord.name}</td>
                  <td>
                  <a href="#" data-id="${erecord.id}"  data-toggle="modal"
                      data-target="#recipe" class="btn btn-info btn-xs get-recipe">View Ingredient</a>
                 </td>
                  <td><a href="#" data-id="${erecord.id}" class="btn  btn-danger btn-xs remove-recipe" >Delete cocktail</a>
                </td>
                </tr>`;
            });
        }
    }

    removeFavoriteItem(item) {
        item.remove();
    }
}
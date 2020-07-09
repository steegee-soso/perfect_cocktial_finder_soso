export class CocktailDB {

    getDrinks() {

        let returnDrinks;

        if (localStorage.getItem('drinks') == null) {
            returnDrinks = [];
        } else {
            returnDrinks = JSON.parse(localStorage.getItem("drinks"));
        }
        return returnDrinks;
    }

    saveDrinks(drinks) {
        const data = this.getDrinks();
        data.push(drinks);
        localStorage.setItem('drinks', JSON.stringify(data));
    }

    getSize() {
        const sizeDataStorage = this.getDrinks();
        return sizeDataStorage.length;
    }

    removeFavoriteStorage(id) {

        const getItems = this.getDrinks();

        getItems.forEach(function(drinksItems, index) {

            if (drinksItems.id === id) {
                getItems.splice(index, 1);
                localStorage.setItem('drinks', JSON.stringify(getItems));
            } else {
                console.log("No found nothing in The ")
            }
        });
    }
}
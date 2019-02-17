const liveSearch = (results, search) => {
    return results.filter((result) => {
        return (result.substr(0, search.length) === search);
    });
};

const FruitModel = ((fruitsData) => {
    const fruits = fruitsData;

    const getAllFruits = () => {
        const allFruits = {};

        for (let month in fruits) {
            let fruitsGroupedByMonth = fruits[month];

            fruitsGroupedByMonth.forEach((fruit) => {
                allFruits[fruit] = 1;
            });
        }

        return Object.keys(allFruits);
    };

    const getFruitsByCurrentMonth = () => {
        if (fruits.length === 0) {
            return [];
        }

        const date = new Date();
        const months = Object.keys(fruits);
        const currentMonth = months[date.getMonth()]

        return fruits[currentMonth];
    };

    const isSeason = (fruit) => {
        const results = liveSearch(getFruitsByCurrentMonth(), fruit); 

        return results.length === 1;
    };

    const searchFruit = (fruit) => {
        return liveSearch(getAllFruits(), fruit);
    };

    return {
        isSeason: isSeason,
        searchFruit: searchFruit
    };
}) (fruitsData);

const fruitView = (fruits) => {
    let html = '<ul class="list-group text-left">';

    if (fruits.length > 0) {
        fruits.forEach((fruit) => {
            html += `<li class="list-group-item" onclick="FruitController.selectFruit('${fruit}')">${fruit}</li>`;
        });
    } else {
        html += `<li class="list-group-item">No encontrado</li>`;
    }

    html += '</ul>'

    return html;
};

const FruitController = (() => {
    const $answer = document.querySelector('#answer');
    const $results = document.querySelector('#results');

    const searchFruit = (fruit) => {
        $answer.innerHTML = '';
        $results.innerHTML = '';

        if (fruit.trim() === '') {
            return;
        }

        const fruitsFound = FruitModel.searchFruit(fruit);
        $results.innerHTML = fruitView(fruitsFound);
    };

    const selectFruit = (fruit) => {
        const isSeason = FruitModel.isSeason(fruit);

        document.querySelector('#search').value = fruit;
        $answer.innerHTML = (isSeason) ? 'SÍ' : 'NO';
        $results.innerHTML = '';
    };

    return {
        searchFruit: searchFruit,
        selectFruit: selectFruit
    };
}) ();

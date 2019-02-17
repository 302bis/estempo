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
        return getFruitsByCurrentMonth().includes(fruit); 
    };

    return {
        getAllFruits: getAllFruits,
        getFruitsByCurrentMonth: getFruitsByCurrentMonth,
        isSeason: isSeason,
    };
}) (fruitsData);

const FruitController = (() => {
    const $answer = document.querySelector('#answer');

    const selectFruit = (fruit) => {
        const isSeason = FruitModel.isSeason(fruit);

        document.querySelector('#search').value = fruit;
        $answer.innerHTML = (isSeason) ? 'SÍ' : 'NO';
    };

    return {
        selectFruit: selectFruit
    };
}) ();

const { SELECTORS } = require("./constants");

const getProductsListBySearchQuery = async (searchQuery, page) => {
    await page.goto(`https://lista.mercadolivre.com.br/${searchQuery}`);

    await page.waitForSelector(`${SELECTORS.RESULTS_LIST.MAIN} ${SELECTORS.RESULTS_LIST.ITEM.MAIN}`);
    const productsList = await page.evaluate((SELECTORS) => {
        const productLiElements = document.querySelectorAll(`${SELECTORS.RESULTS_LIST.MAIN} ${SELECTORS.RESULTS_LIST.ITEM.MAIN}`);
        let productsListLocal = []
        for (let i = 0; i < productLiElements.length; i++) {
            const productObject = {
                title: productLiElements[i].querySelector(SELECTORS.RESULTS_LIST.ITEM.TITLE).textContent.trim(),
                url: productLiElements[i].querySelector(SELECTORS.RESULTS_LIST.ITEM.URL).href,
                price: productLiElements[i].querySelector(SELECTORS.RESULTS_LIST.ITEM.PRICE).textContent.trim(),
                store: productLiElements[i].querySelector(SELECTORS.RESULTS_LIST.ITEM.BRAND) === null ? "Sem informação de loja" : productLiElements[i].querySelector(SELECTORS.RESULTS_LIST.ITEM.BRAND).textContent.trim(),
                state: productLiElements[i].querySelector(SELECTORS.RESULTS_LIST.ITEM.STATE) === null ? "Sem informação de estado" : productLiElements[i].querySelector(SELECTORS.RESULTS_LIST.ITEM.STATE).textContent.trim()
            };
            productsListLocal.push(productObject);
        }
        return productsListLocal;
    }, SELECTORS);

    return productsList;
};

module.exports = {
    getProductsListBySearchQuery
};
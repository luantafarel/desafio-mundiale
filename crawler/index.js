// Write Javascript code here 
const puppeteer = require('puppeteer')

const { getProductsListBySearchQuery } = require("./actions");


module.exports = async (product) => {
    // A forma mais otimizada de realizar essa funcao é customizando a url de acordo com o produto buscado.
    // Uma outra opção utilizável seria injetar a string no campo de busca e usar a url resultante
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        return getProductsListBySearchQuery(product, page);
    } catch (error) {
        await browser.close();
    }
}
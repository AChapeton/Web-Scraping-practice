/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const puppeteer = require('puppeteer');

// Casi todas las funcionalidades de puppeteer devuelven una Promesa

async function run() {
  // Abrir navegador
  const browser = await puppeteer.launch();

  // Abrir nueva página (tab)
  const page = await browser.newPage();

  const reviews = [];

  async function getPageData() {
    // Navegar a una página
    await page.goto('https://platzi.com/cursos/html5-css3/opiniones/1');

    //Forma de recoger la data del sitio web
    const data = await page.evaluate(() => {
      const $reviews = document.querySelectorAll('.Review');
      const data = [];

      $reviews.forEach(($review) => {
        data.push({
          content: $review
            .querySelector('.Review-description')
            .textContent.trim(),
        });
      });
      return {
        reviews: data,
      };
    });
    console.log(data);
  }

  // Screenshot a la página
  // await page.screenshot({
  //   path: 'screenshot.png',
  //   fullPage: true,
  // });

  getPageData();
  // Cerrar navegador
  // await browser.close();
}

run();

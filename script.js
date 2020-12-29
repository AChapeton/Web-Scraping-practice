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

  async function getPageData(pageNumber = 1) {
    // Navegar a una página
    await page.goto('https://platzi.com/cursos/html5-css3/opiniones/1');

    // Forma de recoger la data del sitio web
    const data = await page.evaluate(() => {
      const $reviews = document.querySelectorAll('.Review');

      // Obtener elemento de paginación
      const $pagination = document.querySelectorAll(
        '.Pagination .Pagination-number'
      );

      // Total de páginas
      const totalPages = Number(
        $pagination[$pagination.length - 1].textContent.trim()
      );
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
        totalPages,
      };
    });

    console.log(`page ${pageNumber} of ${data.totalPages} completed`);

    if (pageNumber <= data.totalPages) {
      getPageData(pageNumber + 1);
    } else {
      await browser.close();
    }

    // console.log(data);
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

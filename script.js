/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const puppeteer = require('puppeteer');
const fs = require('fs');

// Casi todas las funcionalidades de puppeteer devuelven una Promesa

async function run() {
  // Abrir navegador
  const browser = await puppeteer.launch();

  // Abrir nueva página (tab)
  const page = await browser.newPage();

  let reviews = [];

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
          username: $review.querySelector('.Review-name').textContent,
          rating: $review.querySelector('.Review-stars .fulled').length,
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

    //Sobreponiendo data por cada nueva página
    reviews = [...reviews, ...data.reviews];

    console.log(`page ${pageNumber} of ${data.totalPages} completed`);

    if (pageNumber <= data.totalPages) {
      getPageData(pageNumber + 1);
    } else {
      //Guardar la data en un archivo
      fs.writeFile('data.json', JSON.stringify(reviews), () => {
        console.log('data saved');
      });
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

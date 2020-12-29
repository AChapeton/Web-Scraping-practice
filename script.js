/* eslint-disable linebreak-style */
const puppeteer = require('puppeteer');

//Casi todas las funcionalidades de puppeteer devuelven una Promesa

async function run() {
  //Abrir navegador
  const browser = await puppeteer.launch();

  //Abrir nueva página (tab)
  const page = await browser.newPage();

  //Navegar a una página
  await page.goto('https://platzi.com/cursos/html5-css3/opiniones/1');

  //Screenshot a la página
  await page.screenshot({
    path: 'screenshot.png',
    fullPage: true,
  });
}

run();

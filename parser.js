const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { addProgram } = require("./database.js"); 


async function parseTVPrograms() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://vkvideo.ru/@tvkulltura/all', { waitUntil: 'networkidle2' });
    const content = await page.content();
    const $ = cheerio.load(content);

    $('div[data-testid="video_card_title"]').each((i, el) => {
        const title = $(el).find('a').attr('title'); 
        const link = "https://vkvideo.ru" + $(el).find('a').attr('href'); 
        const channel = "Культура"; 
        const description = "";
        const date = ""; 

        if (title) {
            addProgram(title, description, channel, date, link); 
            console.log(`✅ Добавлена передача: ${title}`);
        }
    });

    await browser.close();
}

parseTVPrograms();


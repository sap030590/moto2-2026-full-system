const puppeteer = require("puppeteer");
const fs = require("fs-extra");

const URL = "https://www.motogp.com/en/results/moto3";

async function scrapeResults() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle2" });

  const results = await page.evaluate(() => {
    const data = [];

    document.querySelectorAll("table tr").forEach(row => {
      const cols = row.querySelectorAll("td");

      if (cols.length > 3) {
        data.push({
          pos: cols[0]?.innerText,
          rider: cols[1]?.innerText,
          team: cols[2]?.innerText,
          time: cols[3]?.innerText
        });
      }
    });

    return data;
  });

  await browser.close();

  await fs.writeJson("./results.json", results, { spaces: 2 });

  console.log("Results updated:", results.length);
}

scrapeResults();

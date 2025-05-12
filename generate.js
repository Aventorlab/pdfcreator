const fs = require('fs-extra');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const htmlTemplate = await fs.readFile('template.html', 'utf8');
    const template = Handlebars.compile(htmlTemplate);

    const data = await fs.readJson('data.json');
    const html = template(data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: `Selection-Summary-${data.unit.name}.pdf`,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm'
      }
    });

    await browser.close();
    console.log('✅ PDF created successfully');
  } catch (err) {
    console.error('❌ Something went wrong:', err);
  }
})();

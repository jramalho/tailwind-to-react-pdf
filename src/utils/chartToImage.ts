import { renderToString } from 'react-dom/server';
import puppeteer from 'puppeteer';

export async function chartToImage(chart: React.ReactNode, width = 500, height = 300): Promise<string> {
  // Render the chart to HTML
  const html = renderToString(chart as React.ReactElement);
  
  // Use puppeteer to render in a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set up the page with the chart
  await page.setContent(`
    <html>
      <body>
        <div id="chart" style="width: ${width}px; height: ${height}px;">
          ${html}
        </div>
      </body>
    </html>
  `);
  
  // Wait for any async rendering to complete
  await page.waitForSelector('#chart svg');
  
  // Take a screenshot
  const element = await page.$('#chart');
  const screenshot = await element?.screenshot({ encoding: 'base64' });
  
  await browser.close();
  
  return `data:image/png;base64,${screenshot}`;
}
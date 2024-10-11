import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

type ResponseData = {
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | Buffer>) {
  console.log('Generate images')

  const { htmlContent } = req.body

  console.log('---htmlContent', htmlContent)

  if (!htmlContent) {
    return res.status(400).json({ error: 'Missing HTML content' })
  }

  try {
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser', // Use the installed Chromium
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for Docker
      protocolTimeout: 300000,
    })

    console.log('---browser', browser)

    const page = await browser.newPage()

    // Set the content of the page to the provided HTML
    await page.setContent(htmlContent)

    // Optional: adjust the viewport if necessary
    await page.setViewport({ width: 400, height: 400 })

    console.log('---page', page)

    // Capture the image as PNG
    const imageScreenshot = await page.screenshot({ type: 'png' })
    console.log('---imageScreenshot', imageScreenshot)

    await browser.close()
    const imageBuffer = Buffer.from(imageScreenshot)
    console.log('---imageBuffer', imageBuffer)

    // Send the image as a response
    res.setHeader('Content-Type', 'image/png')
    res.send(imageBuffer)
  } catch (error) {
    console.error('Error generating image:', error)
    res.status(500).json({ error: 'Failed to generate image' })
  }
}

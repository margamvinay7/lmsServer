import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

export async function generateCertificatePDF({
  userName,
  courseTitle,
  issueDate
}: {
  userName: string
  courseTitle: string
  issueDate: string
}) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 400])
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  page.drawText('Certificate of Completion', {
    x: 150,
    y: 330,
    size: 24,
    font,
    color: rgb(0.1, 0.1, 0.1)
  })

  page.drawText(`${userName}`, {
    x: 220,
    y: 280,
    size: 20,
    font,
    color: rgb(0, 0, 0.6)
  })

  page.drawText(`has completed the course:`, {
    x: 180,
    y: 250,
    size: 14,
    font
  })

  page.drawText(`${courseTitle}`, {
    x: 200,
    y: 220,
    size: 16,
    font,
    color: rgb(0.2, 0.4, 0.7)
  })

  page.drawText(`Issued on: ${issueDate}`, {
    x: 200,
    y: 180,
    size: 12,
    font
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

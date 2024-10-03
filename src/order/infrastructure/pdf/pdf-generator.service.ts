import { PdfDocument } from '@ironsoftware/ironpdf';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service-interface';

export class PdfGeneratorService implements PdfGeneratorServiceInterface {
  async generatePdf(text: string): Promise<Buffer> {
    const pdf = await PdfDocument.fromHtml(`<html><body>${text}</body></html>`);
    return pdf.saveAsBuffer();
  }
}
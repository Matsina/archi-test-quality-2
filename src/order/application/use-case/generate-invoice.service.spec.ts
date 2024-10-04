import { OrderRepositoryInterface } from 'src/order/domain/port/persistence/order.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { GenerateInvoiceService } from '../use-case/generate-invoice.service';
import { Order, OrderStatus } from '../../domain/entity/order.entity';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service-interface';

class OrderRepositoryFake {
  async save(order) {
    return order;
  }

  async findById(id) {
    const order = new Order({
      customerName: 'Maurice',
      items: [
        { productName: 'item 1', price: 10, quantity: 1 },
        { productName: 'item 1', price: 10, quantity: 1 },
        { productName: 'item 1', price: 10, quantity: 1 },
        { productName: 'item 1', price: 10, quantity: 1 },
      ],
      shippingAddress: 'Shipping Address',
      invoiceAddress: 'Invoice Address',
    });

    // order.id = id;
    // order.status = OrderStatus.PENDING;

    return order;
  }
}
class PdfGeneratorServiceFake {
    async generatePdf(text: string): Promise<Buffer>{
        return Buffer.from(text)
    }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

const pdfGeneratorServiceFake =
  new PdfGeneratorServiceFake() as PdfGeneratorServiceInterface;

describe("L'adresse de livraison ne peut être définie si la commande n'a pas été payée", () => {
  it('should return an error', async () => {
    const generateInvoiceService = new GenerateInvoiceService(
      orderRepositoryFake,
      pdfGeneratorServiceFake,
    );

    await expect(
      generateInvoiceService.generateInvoice('1'),
    ).rejects.toThrow();
  });
});

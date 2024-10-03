import { NotFoundException } from '@nestjs/common';
import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

export class GenerateInvoiceService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Pas de commande');
    }

    order.generateInvoicePdf();


    return await this.orderRepository.save(order);
  }
}

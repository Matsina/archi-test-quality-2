import { NotFoundException } from '@nestjs/common';
import { Order } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistence/order.repository.interface';

export class CancelOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  public async execute(orderId: string, cancelReason: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Pas de commande');
    }

    order.cancel(cancelReason);

    return this.orderRepository.save(order);
  }
}

import { OrderRepositoryInterface } from 'src/order/domain/port/persistence/order.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { PayOrderService } from '../use-case/pay-order.service';
import { Order, OrderStatus } from '../../domain/entity/order.entity';

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

    order.id = id;
    order.status = OrderStatus.PAID;

    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe('La commande ne peut pas être repayée une deuxième fois', () => {
  it('should return an error', async () => {
    const cancelOrderService = new PayOrderService(orderRepositoryFake);
    await expect(cancelOrderService.execute('1')).rejects.toThrow();
  });
});

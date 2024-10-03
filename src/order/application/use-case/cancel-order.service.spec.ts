import { OrderRepositoryInterface } from 'src/order/domain/port/persistence/order.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { CancelOrderService } from '../use-case/cancel-order.service';
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
    order.status = OrderStatus.SHIPPED;

    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("An order can't be canceled if it has been shipped", () => {
  it('should return an error', async () => {
    const cancelOrderService = new CancelOrderService(orderRepositoryFake);

    await expect(
      cancelOrderService.execute('1', 'Votre produit est naze'),
    ).rejects.toThrow();
  });
});

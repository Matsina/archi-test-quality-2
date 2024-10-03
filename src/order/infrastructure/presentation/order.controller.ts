import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateOrderCommand,
  Order,
} from 'src/order/domain/entity/order.entity';
import { CreateOrderService } from 'src/order/application/use-case/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order.service';
import { SetShippingAddressOrderService } from '../../application/use-case/set-shipping-address-order.service';
import { CancelOrderService } from '../../application/use-case/cancel-order.service';
import { SetInvoiceAddressOrderService } from '../../application/use-case/set-invoice-address-order.service';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
    private readonly setShippingAddressService: SetShippingAddressOrderService,
    private readonly setInvoiceAddressService: SetInvoiceAddressOrderService,
    private readonly cancelOrderService: CancelOrderService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderCommand: CreateOrderCommand,
  ): Promise<Order> {
    return this.createOrderService.execute(createOrderCommand);
  }

  @Post()
  async payOrder(@Param('id') id: string): Promise<Order> {
    return await this.payOrderService.execute(id);
  }

  @Post()
  async shippingAddress(
    @Param('id') id: string,
    @Body('shippingAddress') shippingAddress: string,
  ): Promise<Order> {
    return await this.setShippingAddressService.execute(id, shippingAddress);
  }
  @Post()
  async invoiceAddress(
    @Param('id') id: string,
    @Body('invoiceAddress') invoiceAddress: string,
  ): Promise<Order> {
    return await this.setInvoiceAddressService.execute(id, invoiceAddress);
  }

  @Post()
  async cancelOrder(
    @Param('id') id: string,
    @Body('cancellationReason') cancellationReason: string,
  ): Promise<Order> {
    return await this.cancelOrderService.execute(id, cancellationReason);
  }
}

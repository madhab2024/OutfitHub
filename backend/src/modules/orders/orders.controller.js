import { successResponse } from '@platform/shared/utils'

import { ordersService } from './orders.service.js'

export const createOrder = async (req, res) => {
  const result = await ordersService.createOrder(req.body, req.user)
  res.status(201).json(successResponse({ message: 'Order created.', data: result }))
}

export const listOrders = async (req, res) => {
  const result = await ordersService.listOrders(req.query, req.user)
  res.status(200).json(successResponse({ message: 'Orders fetched.', data: result }))
}

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body
  const result = await ordersService.updateOrderStatus(req.params.id, status)
  res.status(200).json(successResponse({ message: 'Order status updated.', data: result }))
}
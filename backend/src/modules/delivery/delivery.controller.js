import { successResponse } from '@platform/shared/utils'

import { deliveryService } from './delivery.service.js'

export const getDeliveryByOrderId = async (req, res) => {
  const result = await deliveryService.getByOrderId(req.params.orderId)

  res.status(200).json(
    successResponse({
      message: 'Delivery tracking fetched.',
      data: result,
    }),
  )
}

export const upsertDeliveryTracking = async (req, res) => {
  const result = await deliveryService.upsertTracking({
    orderId: req.params.orderId,
    status: req.body.status,
    location: req.body.location,
    eta: req.body.eta,
  })

  res.status(200).json(
    successResponse({
      message: 'Delivery tracking updated.',
      data: result,
    }),
  )
}
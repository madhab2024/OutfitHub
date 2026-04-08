import { Router } from 'express'

import { authenticate } from '../../middleware/authMiddleware.js'
import { authorizeRoles } from '../../middleware/roleMiddleware.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import {
  getDeliveryByOrderId,
  upsertDeliveryTracking,
} from './delivery.controller.js'

export const deliveryRouter = Router()

deliveryRouter.use(authenticate)
deliveryRouter.get(
  '/:orderId',
  authorizeRoles('admin', 'customer', 'shop_owner', 'logistic_partner'),
  asyncHandler(getDeliveryByOrderId),
)
deliveryRouter.put(
  '/:orderId',
  authorizeRoles('admin', 'logistic_partner'),
  asyncHandler(upsertDeliveryTracking),
)
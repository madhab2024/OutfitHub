import { Router } from 'express'

import { authenticate } from '../../middleware/authMiddleware.js'
import { authorizeRoles } from '../../middleware/roleMiddleware.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { createOrder, listOrders, updateOrderStatus } from './orders.controller.js'

export const orderRouter = Router()

// orderRouter.use(authenticate)
orderRouter.post('/', authorizeRoles('customer'), asyncHandler(createOrder))
orderRouter.get(
  '/',
  /* authorizeRoles('admin', 'customer', 'shop_owner', 'logistic_partner'), */
  asyncHandler(listOrders),
)
orderRouter.patch(
  '/:id/status',
  authorizeRoles('admin', 'shop_owner', 'logistic_partner'),
  asyncHandler(updateOrderStatus),
)
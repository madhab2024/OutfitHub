import { Router } from 'express'

import { authenticate } from '../../middleware/authMiddleware.js'
import { authorizeRoles } from '../../middleware/roleMiddleware.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from './products.controller.js'

export const productRouter = Router()

productRouter.get('/', asyncHandler(listProducts))
productRouter.get('/:id', asyncHandler(getProduct))
productRouter.post(
  '/',
  authenticate,
  authorizeRoles('admin', 'shop_owner'),
  asyncHandler(createProduct),
)
productRouter.put(
  '/:id',
  authenticate,
  authorizeRoles('admin', 'shop_owner'),
  asyncHandler(updateProduct),
)
productRouter.delete(
  '/:id',
  authenticate,
  authorizeRoles('admin', 'shop_owner'),
  asyncHandler(deleteProduct),
)
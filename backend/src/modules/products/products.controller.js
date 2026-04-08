import { successResponse } from '@platform/shared/utils'

import { productsService } from './products.service.js'

export const listProducts = async (req, res) => {
  const { page, limit, search } = req.query
  const result = await productsService.listProducts({ page, limit, search })

  res.status(200).json(successResponse({ message: 'Products fetched.', data: result }))
}

export const getProduct = async (req, res) => {
  const result = await productsService.getProductById(req.params.id)
  res.status(200).json(successResponse({ message: 'Product fetched.', data: result }))
}

export const createProduct = async (req, res) => {
  const result = await productsService.createProduct(req.body)
  res.status(201).json(successResponse({ message: 'Product created.', data: result }))
}

export const updateProduct = async (req, res) => {
  const result = await productsService.updateProduct(req.params.id, req.body)
  res.status(200).json(successResponse({ message: 'Product updated.', data: result }))
}

export const deleteProduct = async (req, res) => {
  await productsService.deleteProduct(req.params.id)
  res.status(200).json(successResponse({ message: 'Product deleted.' }))
}
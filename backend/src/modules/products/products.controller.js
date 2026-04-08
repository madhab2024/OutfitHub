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

import OpenAI from "openai"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OPENAI_API_KEY
})

export const generateAiDescription = async (req, res) => {
  try {
    const { name, category, style, size, price } = req.body

    const prompt = `Write a compelling ecommerce marketing description (max 3 sentences) for a product with these details:
    Name: ${name}
    Category: ${category}
    Style/Sub-category: ${style || ''}
    Size options: ${size || ''}
    Price: ${price}
    Make it engaging and persuasive.`

    const completion = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001", // Corrected model ID
      messages: [{ role: "user", content: prompt }]
    })

    const description = completion.choices[0].message.content
    res.status(200).json(successResponse({ message: 'Description generated.', data: { description } }))
  } catch (error) {
    console.error("AI Generation Error:", error)
    res.status(500).json({ success: false, message: "Failed to generate AI description." })
  }
}
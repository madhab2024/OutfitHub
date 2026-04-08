export const successResponse = ({ message, data = null }) => ({
  success: true,
  message,
  data,
})

export const errorResponse = ({ message, details = null }) => ({
  success: false,
  message,
  details,
})

export const parsePagination = ({ page = 1, limit = 20 }) => {
  const safePage = Number.isNaN(Number(page)) ? 1 : Math.max(1, Number(page))
  const safeLimit = Number.isNaN(Number(limit)) ? 20 : Math.min(100, Math.max(1, Number(limit)))

  return {
    page: safePage,
    limit: safeLimit,
    offset: (safePage - 1) * safeLimit,
  }
}

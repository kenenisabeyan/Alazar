/**
 * 404 catch-all middleware — register after all routes.
 */
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found — ${req.method} ${req.originalUrl}`,
  });
};

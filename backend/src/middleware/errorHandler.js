/**
 * Global Express error handler — must be registered LAST in server.js.
 * Catches any error passed via next(err).
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[Error]', err.stack);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

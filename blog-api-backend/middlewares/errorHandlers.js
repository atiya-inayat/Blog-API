// 404 for unknown routes

export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

// global error handler
export const errorHandlerr = (err, req, res, next) => {
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || "Server Error" });
};

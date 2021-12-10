const notFound = (req: any, res: any, next: any) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err: any, _: any, res: any, next: any) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(statusCode);
  res.status(200);
  res.json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

export { notFound, errorHandler };

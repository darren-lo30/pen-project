import { RequestHandler } from "express"

const checkAuthenticated: RequestHandler = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) { return next() }
  res.sendStatus(400);
}

export { checkAuthenticated }
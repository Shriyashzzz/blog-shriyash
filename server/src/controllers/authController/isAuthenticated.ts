import type { Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response) => {
  res.status(200).json({ message: "User is authenticated", user: req.user });
};

export default isAuthenticated;

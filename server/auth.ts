import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

export const SECRET_KEY: Secret = "x4WbO1aggfOnKUjNDDiLjH1E53nL40Jh";

export const authMiddleware = (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	const token = req.headers["authorization"]?.replace("Bearer ", "");
	if (token) {
		try {
			const verificationResult = verify(token, SECRET_KEY) as {
				isAdmin: boolean;
				iat: number;
			};
			if (verificationResult.isAdmin) {
				req.isAdmin = true;
			}
			next();
		} catch (ex) {
			next();
		}
	} else {
		next();
	}
};

export const AdminProtected = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!!req.isAdmin) next();
	else res.status(401).end();
};

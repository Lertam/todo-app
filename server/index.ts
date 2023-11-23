import ApiRouter from './routes/api';
import express from 'express';
import { authMiddleware } from './auth';

const app = express();

declare global {
	namespace Express {
		interface Request {
			isAdmin?: boolean;
		}
	}
}

app.use(express.json());
app.use(authMiddleware);
app.use("/api", ApiRouter);

app.use((_, res) => {
	res.status(404).end();
});

app.listen(8080, () => console.log("Server listening on port 8080"));

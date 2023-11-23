import * as jwt from "jsonwebtoken";
import { AdminProtected, SECRET_KEY } from "../auth";
import { Prisma, PrismaClient } from "@prisma/client";
import { Router } from "express";
import {
	body,
	matchedData,
	param,
	query,
	validationResult,
} from "express-validator";

const router = Router();
const prisma = new PrismaClient();

router.get(
	"/",
	query("page").optional().isInt({ min: 1 }),
	query("order").optional().isString(),
	async (req, res) => {
		const TODOS_PER_PAGE = 3;

		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array()).end();
		}

		let page: number = 1;
		const validatedData = matchedData(req);
		if (validatedData.page) {
			const _page = parseInt(validatedData.page);
			if (!isNaN(_page)) page = _page;
		}
		let orderBy: Prisma.TodoOrderByWithRelationInput;
		switch (validatedData.order) {
			case "username_desc":
				orderBy = { username: "desc" };
				break;
			case "username_asc":
				orderBy = { username: "asc" };
				break;
			case "email_desc":
				orderBy = { email: "desc" };
				break;
			case "email_asc":
				orderBy = { email: "asc" };
				break;
			case "completed_desc":
				orderBy = { completed: "desc" };
				break;
			case "completed_asc":
				orderBy = { completed: "asc" };
				break;
			default:
				orderBy = { id: "desc" };
				break;
		}

		const [todos, totalPayload] = await Promise.all([
			prisma.todo.findMany({
				orderBy,
				take: TODOS_PER_PAGE,
				skip: TODOS_PER_PAGE * (page - 1),
			}),
			prisma.todo.count(),
		]);

		const paginatedPayload = {
			totalPages: Math.ceil(totalPayload / TODOS_PER_PAGE),
			items: todos,
		};
		res.json(paginatedPayload).status(200).end();
	}
);

/**
 * Точка создания задачи.
 */
router.post(
	"/",
	body("title").isString(),
	body("username").isString(),
	body("email").isEmail(),
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array()).end();
		}
		const { title, username, email } = matchedData(req);
		const newTodo = await prisma.todo.create({
			data: {
				title,
				username,
				email,
			},
		});
		res.status(201).json(newTodo).end();
	}
);

router.put(
	"/:todoId",
	AdminProtected,
	param("todoId").isInt({ min: 0 }),
	body("title").optional().isString(),
	body("completed").optional().isBoolean(),
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array()).end();
		}
		const { title, todoId: todoIdStr, completed } = matchedData(req);
		if (title === undefined && completed === undefined) {
			return res
				.status(400)
				.send("You must provide updated title text or completed state")
				.end();
		}
		const todoId = parseInt(todoIdStr);
		const todoToUpdate = await prisma.todo.findUnique({
			where: {
				id: todoId,
			},
		});
		if (!todoToUpdate) {
			return res.status(404).end();
		}
		const updatedTodo = await prisma.todo.update({
			where: {
				id: todoToUpdate.id,
			},
			data: {
				title,
				completed,
				editedByAdmin: title !== undefined && title !== todoToUpdate.title,
			},
		});
		res.status(200).json(updatedTodo).end();
	}
);

router.post(
	"/login",
	body("login").isString(),
	body("password").isString(),
	async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(400).json(validationErrors.array()).end();
		}

		const { login, password } = matchedData(req);

		if (login === "admin" && password === "123") {
			const token = jwt.sign({ isAdmin: true }, SECRET_KEY);
			res.status(200).json({ token }).end();
		} else {
			res.status(401).end();
		}
	}
);

export default router;

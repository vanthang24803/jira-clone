import { BaseResponse } from "@/helpers";
import { logger } from "@/libs";
import express, { type Router } from "express";
import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import authRoute from "./auth.route";
import commentRoute from "./comment.route";
import meRoute from "./me.route";
import projectRoute from "./project.route";
import taskRoute from "./task.route";

const router: Router = express.Router();

router.use("/auth", authRoute);
router.use("/me", passport.authenticate("jwt", { session: false }), meRoute);
router.use(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  projectRoute,
);

router.use(
  "/projects/:projectId/tasks",
  passport.authenticate("jwt", { session: false }),
  taskRoute,
);

router.use(
  "/projects/:projectId/tasks/:taskId/comments",
  passport.authenticate("jwt", { session: false }),
  commentRoute,
);

router.get("/", (_: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json(new BaseResponse<string>(200, "Hello World"));
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export { router };

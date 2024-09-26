import { Hono } from "hono";
import { projectController as pc } from "../controllers";

const projectRouter = new Hono();

projectRouter.get("/", pc.getAllProjects);

projectRouter.get("/:id", pc.getProjectById);

projectRouter.post("/", pc.createProject);

projectRouter.delete("/:id", pc.deleteProject);

projectRouter.patch("/:id", pc.updateProject);

projectRouter.put("/:id", async (c) => {
    return c.status(501);
});

export default projectRouter;

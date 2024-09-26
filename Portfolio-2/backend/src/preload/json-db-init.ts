const databasePath: string =
    process.env.DB_JSON_PROJECTS || "./data/projects.json";
if (!(await Bun.file(databasePath).exists())) {
    Bun.write(databasePath, JSON.stringify([]));
}

const baseUrl: URL = new URL("http://localhost:3001");

const endpointsV1 = {
    projects: new URL("/v1/projects", baseUrl),
};
console.log(endpointsV1.projects);

export { endpointsV1, endpointsV1 as endpoints };

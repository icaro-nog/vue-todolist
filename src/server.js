import { Server, Model } from "miragejs";

export function makeServer({ environment = 'development' } = {}) {
    let server = new Server({
        environment,

        // Define initial data (optional, but useful for a todo list)
        seeds(server) {
            server.create("todo", { id: 1, title: "Learn Mirage JS", completed: false });
            server.create("todo", { id: 2, title: "Learn Mirage JS", completed: true });
            server.create("todo", { id: 3, title: "Learn Mirage JS", completed: true });
        },

        // Define models for your data
        models: {
            todo: Model, // Assuming you import Model from "miragejs"
        },

         // Define your API routes
        routes() {
            // Namespace your API routes (e.g., /api/todos)
            this.namespace = "api";

            // GET all todos
            this.get("/todos", (schema) => {
                return schema.todos.all();
            });

            // GET a single todo by ID
            this.get("/todos/:id", (schema, request) => {
                let id = request.params.id;
                return schema.todos.find(id);
            });

            // POST a new todo
            this.post("/todos", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.todos.create(attrs);
            });

            // // PUT/PATCH to update a todo
            // this.patch("/todos/:id", (schema, request) => {
            //     let id = request.params.id;
            //     let attrs = JSON.parse(request.requestBody);
            //     let todo = schema.todos.find(id);
            //     return todo.update(attrs);
            // });

            // // DELETE a todo
            // this.delete("/todos/:id", (schema, request) => {
            //     let id = request.params.id;
            //     schema.todos.find(id).destroy();
            //     return new Response(204); // No content
            // });
        },
    });

    return server;
}
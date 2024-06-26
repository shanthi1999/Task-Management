﻿# Task-Management

Server-side application for managing tasks using GraphQL and MongoDB.
```
server/
│
├── src/
│ ├── api/
│ │ ├── user/
│ │ │ ├── user.model.js
│ │ │ ├── user.resolvers.js
│ │ │ ├── user.typeDefs.js
│ │ │ └── user.controller.js (optional, for additional business logic)
│ │ │
│ │ ├── project/
│ │ │ ├── project.model.js
│ │ │ ├── project.resolvers.js
│ │ │ ├── project.typeDefs.js
│ │ │ └── project.controller.js (optional, for additional business logic)
│ │ │
│ │ └── index.js (Exports all resolvers, typeDefs, and models)
│ │
│ ├── config/
│ │ ├── database.js (MongoDB connection setup)
│ │ ├── graphql.js (GraphQL server configuration)
│ │ └── ...
│ │
│ ├── utils/
│ │ ├── auth.js (Authentication middleware)
│ │ └── ...
│ │
│ ├── server.js (Entry point of the application)
│ └── ...
│
├── node_modules/
│
├── package.json
└── ...
```

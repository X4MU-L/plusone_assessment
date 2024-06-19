# PlusOne Assessment API

This project is a blog API built using Express, Node.js, and MongoDB.

## Endpoints

### Blog Post Endpoints

- **GET /api/v1/blog-post**: Returns all blog posts.

  - Optional query parameters:
    - `limit`: The limit of the return response.
    - `page`: The page or skip of the request for pagination.
  - Response:
    - `total`: Total number of posts available.
    - `posts`: An array of the posts.

- **POST /api/v1/blog-post**: Creates a new blog post.

- **GET /api/v1/blog-post/:id**: Retrieves a particular blog post by its ID.

- **DELETE /api/v1/blog-post/:id**: Deletes a particular blog post by its ID.

- **PUT /api/v1/blog-post/:id**: Updates a particular blog post by its ID.

### Authentication Endpoints

- **POST /api/v1/auth/login**: Logs in a user.

- **POST /api/v1/auth/signup**: Creates a new user.

### User Endpoints

- **GET /api/v1/users/:id**: Retrieves a particular user by their ID.

- **DELETE /api/v1/users/:id**: Deletes a particular user by their ID.

### Utility Endpoints

- **GET /api/v1/verify**: Checks if a username or email is already in use.

  - Query parameters:
    - `email=string`
    - `username=string`

- **GET /api/v1/tags**: Retrieves all tags.

## Local Development

### Prerequisites

- Node.js
- MongoDB

### Getting Started

1. **Clone the repository**:

   ```sh
   git clone https://github.com/X4MU-L/plusone_assessment
   ```

   Navigate to the server directory:

```sh

cd plusone_assessment/server
```

Install dependencies:

```sh
npm install
```

Start the server:

```sh
npm run dev
```

Access the application:

The application will run on http://localhost:5009.

Send a curl request to get all blog posts:

```sh
curl http://localhost:5009/api/v1/blog-post
```

Hosted Backend
The backend is hosted at: https://plusone-assessment.onrender.com/api/v1

You can use the hosted URL to access the API endpoints.

Example Requests
Get All Blog Posts

```sh
curl "http://localhost:5009/api/v1/blog-post?limit=10&page=1"
```

Create a Blog Post

```sh
curl -X POST "http://localhost:5009/api/v1/blog-post" -H "Content-Type: application/json" -d '{"title": "New Post", "content": "This is the content of the new post.", "userId": "sshbhsnbhjbdj"}'
```

User Signup

```sh

curl -X POST "http://localhost:5009/api/v1/auth/signup" -H "Content-Type: application/json" -d '{"firstName": "newuser", "lastName": "newuser", "email": "newuser@example.com", "password": "password123"}'
```

User Login

```sh

curl -X POST "http://localhost:5009/api/v1/auth/login" -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password123"}'
```

Check Username or Email

```sh
curl "http://localhost:5009/api/v1/verify?email=user@example.com"
```

Get Tags

```sh
curl "http://localhost:5009/api/v1/tags"
```

Environment Variables
Make sure to set up your .env file with the necessary environment variables:

```makefile

MONGO_URI=your-mongo-db-uri
APP_SECRET=your-jwt-secret
PORT=5009
```

License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE)LICENSE file for details.

Acknowledgments
This project was built using [Express](https://expressjs.com/).
[MongoDB](https://www.mongodb.com/) is used as the database for this project.

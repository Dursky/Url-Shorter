# URL Shortener API Documentation

## Authentication

### Register a new user

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  Success Response:
  ```

```json
Code: 201
Content: { "token": "jwt_token_here" }
```

### Login a exist user

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Data Params:**
  ```json
  {
  	"email": "user@example.com",
  	"password": "password123"
  }
  ```

Success Response:

```json
Code: 200
Content: {"token": "jwt_token_here" }
```

Error Responses:

```json
Code: 401
Content: { "message": "Invalid credentials" }

Code: 404
Content: { "message": "User not found" }
```

## URL Shortening

### Create a shortened URL

- **URL:** `/api/url`
- **Method: POST**
  Headers: Authorization: Bearer <jwt_token>
- **Data Params:**

```json
{"originalUrl": "https://example.com/test"}
```

Success Response:

```json
Code: 200
Content:
{
  "originalUrl": "https://example.com/test",
  "shorted": "shortened_url_here"
}
```

### Get original URL from shortened URL

- **URL:** `/api/url/:shortCode`
- **Method: GET**
- **Headers:** `Authorization: Bearer <jwt_token>`
- **URL Params:** `shortCode=[string]`

Success Response:

```json
Code: 200
Content: Original URL
```

Error Response:

```json
Code: 404
Content: Not Found
```

### Redirect to original URL

- **URL:** `/short/:shortId`
- **Method: GET**
- **URL Params:** `shortId=[string]`
  Success Response:

```json
Code: 302
Headers: { Location: "original_url_here" }
```

Error Response:

```json
Code: 404
Content: { "message": "Shortened URL not found" }
```

### **Notes**

- All endpoints except for registration and login require authentication.
- Authentication is done using JWT tokens.
- Shortened URLs are unique per user.
- The API uses MongoDB as its database.

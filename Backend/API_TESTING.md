# API Testing Guide

## Base URL
```
http://localhost:8081
```

## Public Endpoints (No Authentication Required)

### 1. Test Auth Endpoint
```
GET http://localhost:8081/api/auth/test
```
**Expected Response:** `"Auth endpoint is working!"`

### 2. Register User
```
POST http://localhost:8081/api/auth/register
Content-Type: application/json

{
    "username": "testuser",
    "email": "test@example.com",
    "passwordHash": "password123",
    "fullName": "Test User",
    "role": "student"
}
```

### 3. Login User
```
POST http://localhost:8081/api/auth/login?username=testuser&password=password123
```

### 4. Test Public Endpoint
```
GET http://localhost:8081/api/test/public
```

## Protected Endpoints (Authentication Required)

### 1. Test Protected Endpoint
```
GET http://localhost:8081/api/test/protected
```
**Note:** This will return 401 Unauthorized without proper authentication.

### 2. Get User Info
```
GET http://localhost:8081/api/test/user-info
```

## Testing with Postman

1. **Register a user first:**
   - Method: POST
   - URL: `http://localhost:8081/api/auth/register`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
       "username": "testuser",
       "email": "test@example.com",
       "passwordHash": "password123",
       "fullName": "Test User",
       "role": "student"
   }
   ```

2. **Test login:**
   - Method: POST
   - URL: `http://localhost:8081/api/auth/login?username=testuser&password=password123`

3. **Test public endpoint:**
   - Method: GET
   - URL: `http://localhost:8081/api/test/public`

## Common Issues and Solutions

### 401 Unauthorized Error
- Make sure you're using the correct endpoint URLs
- Check that the server is running on port 8081
- Verify that PostgreSQL is running and accessible
- Check the application logs for detailed error messages

### Database Connection Issues
- Ensure PostgreSQL is running on localhost:5432
- Verify the database "tedumasters" exists
- Check username/password in application.properties

### CORS Issues
- The application is configured to allow all origins
- If you still get CORS errors, check the browser console for specific details

## Database Setup

Make sure you have PostgreSQL running with:
- Database name: `tedumasters`
- Username: `postgres`
- Password: `admin`
- Port: `5432`

Or update the `application.properties` file with your database credentials. 
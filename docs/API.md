# API Documentation

## Base URL

```
Development: http://localhost:4000/api
Production: https://api.yourdomain.com/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Getting a Token

**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "BUYER"
  }
}
```

### Using the Token

Include the token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Endpoints

### Authentication

#### Register
**POST** `/auth/register`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "BUYER"
}
```

#### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Listings

#### Get All Listings
**GET** `/listings`

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `status` - Filter by status (ACTIVE, SOLD, etc.)
- `listingType` - SALE or RENT
- `propertyType` - RESIDENTIAL, COMMERCIAL, etc.
- `city` - Filter by city
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `bedrooms` - Minimum bedrooms
- `bathrooms` - Minimum bathrooms

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Beautiful 3BR House",
      "description": "...",
      "price": 450000,
      "currency": "USD",
      "bedrooms": 3,
      "bathrooms": 2,
      "sqft": 2000,
      "city": "Los Angeles",
      "state": "CA",
      "country": "US",
      "latitude": 34.0522,
      "longitude": -118.2437,
      "images": ["url1", "url2"],
      "status": "ACTIVE",
      "listingType": "SALE",
      "propertyType": "RESIDENTIAL"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### Get Listing by ID
**GET** `/listings/:id`

Response: Single listing object

#### Get Listing by Slug
**GET** `/listings/slug/:slug`

Response: Single listing object

#### Create Listing
**POST** `/listings` 🔒 (Requires authentication)

Request:
```json
{
  "title": "Beautiful 3BR House",
  "description": "A stunning property...",
  "price": 450000,
  "currency": "USD",
  "listingType": "SALE",
  "propertyType": "RESIDENTIAL",
  "propertySubType": "HOUSE",
  "addressLine1": "123 Main St",
  "city": "Los Angeles",
  "state": "CA",
  "postalCode": "90001",
  "country": "US",
  "countryCode": "US",
  "latitude": 34.0522,
  "longitude": -118.2437,
  "bedrooms": 3,
  "bathrooms": 2,
  "sqft": 2000,
  "yearBuilt": 2020,
  "images": ["url1", "url2"],
  "features": {
    "parking": true,
    "pool": false,
    "garden": true
  }
}
```

#### Update Listing
**PUT** `/listings/:id` 🔒 (Requires authentication)

Request: Same as create (partial updates allowed)

#### Delete Listing
**DELETE** `/listings/:id` 🔒 (Requires authentication)

### Search

#### Search by Radius
**POST** `/search/radius`

Request:
```json
{
  "latitude": 34.0522,
  "longitude": -118.2437,
  "radiusKm": 10,
  "page": 1,
  "limit": 20
}
```

Response: Paginated listings within radius

#### Search by Bounds
**POST** `/search/bounds`

Request:
```json
{
  "north": 34.1,
  "south": 34.0,
  "east": -118.2,
  "west": -118.3,
  "page": 1,
  "limit": 20
}
```

#### Advanced Search
**POST** `/search/advanced`

Request:
```json
{
  "query": "modern apartment",
  "listingType": "RENT",
  "propertyType": "RESIDENTIAL",
  "minPrice": 1000,
  "maxPrice": 3000,
  "bedrooms": 2,
  "bathrooms": 1,
  "city": "Los Angeles",
  "page": 1,
  "limit": 20
}
```

### Favorites

#### Get User Favorites
**GET** `/favorites` 🔒

Response:
```json
[
  {
    "id": "uuid",
    "listing": { /* listing object */ },
    "notes": "Interested in viewing",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Add to Favorites
**POST** `/favorites` 🔒

Request:
```json
{
  "listingId": "uuid",
  "notes": "My favorite property"
}
```

#### Remove from Favorites
**DELETE** `/favorites/:listingId` 🔒

#### Check if Favorited
**GET** `/favorites/check/:listingId` 🔒

Response:
```json
{
  "isFavorite": true
}
```

### Users

#### Get Current User Profile
**GET** `/users/profile` 🔒

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "BUYER",
  "avatar": "url",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile
**PUT** `/users/profile` 🔒

Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "bio": "Looking for a new home"
}
```

#### Delete Account
**DELETE** `/users/profile` 🔒

### Agencies

#### Get All Agencies
**GET** `/agencies`

Response:
```json
[
  {
    "id": "uuid",
    "name": "Best Realty",
    "description": "...",
    "logo": "url",
    "website": "https://example.com",
    "phone": "+1234567890",
    "city": "Los Angeles",
    "agents": [
      {
        "id": "uuid",
        "firstName": "Jane",
        "lastName": "Agent"
      }
    ]
  }
]
```

#### Get Agency by ID
**GET** `/agencies/:id`

#### Create Agency
**POST** `/agencies` 🔒

#### Update Agency
**PUT** `/agencies/:id` 🔒

## Error Responses

All error responses follow this format:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z",
  "path": "/api/auth/register"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Response Headers**:
  - `X-RateLimit-Limit`: Maximum requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time until reset

When rate limit is exceeded:
```json
{
  "statusCode": 429,
  "message": "Too many requests",
  "retryAfter": 60
}
```

## Pagination

All list endpoints support pagination:

Query Parameters:
- `page` - Page number (starts at 1)
- `limit` - Items per page (max 100)

Response includes meta:
```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Filtering & Sorting

### Filtering
Use query parameters to filter results:
```
GET /listings?status=ACTIVE&city=Los Angeles&minPrice=100000
```

### Sorting
```
GET /listings?sortBy=price&sortOrder=asc
```

## Interactive API Documentation

Visit http://localhost:4000/api/docs for Swagger UI with:
- Interactive endpoint testing
- Request/response schemas
- Authentication support
- Example requests

## SDKs & Client Libraries

### JavaScript/TypeScript

```typescript
import api from './lib/api';

// Get listings
const listings = await api.listings.getAll({ page: 1, limit: 20 });

// Create listing
const newListing = await api.listings.create({
  title: "My Property",
  price: 500000,
  // ...
});
```

### cURL Examples

```bash
# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get listings
curl http://localhost:4000/api/listings?page=1&limit=10

# Create listing (authenticated)
curl -X POST http://localhost:4000/api/listings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Property","price":500000,...}'
```

## Webhooks (Coming Soon)

Receive real-time notifications for events:
- New listing created
- Price changed
- Status updated
- Offer received

## API Versioning

Currently using URL versioning:
- v1: `/api/v1/...` (current)
- v2: `/api/v2/...` (future)

The `/api/` prefix defaults to v1.

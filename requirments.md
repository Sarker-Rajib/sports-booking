**Booking Model:**

- `date`: The date of the booking.
- `startTime`: The start time of the booking.
- `endTime`: The end time of the booking.
- `user`: Reference to the user who made the booking.
- `facility`: Reference to the booked facility.
- `payableAmount`: The calculated amount payable for the booking.
- `isBooked`: Status of the booking (confirmed, unconfirmed, or canceled).

### Payable Amount Calculation:

Formula:

```plain
payableAmount = (endTime - startTime) * pricePerHour
```

Assume `endTime` and `startTime` are datetime objects and `pricePerHour` is a numeric value representing the cost per hour.

**Example:**

- Facility's price per hour: 20 TK
- Booking start time: 10:00 AM
- Booking end time: 1:00 PM

Calculation:

- Duration: 3 hours
- Payable amount: 3 hours \* 20 TK/hour = 60 TK

### API Endpoints

#### Booking Routes

### 7\. Check Availability

Check the availability of time slots for booking on a specific date.

- **Route**: `GET /api/check-availability`

#### Query Parameters

- **date** (`string`, optional): The date for which availability is to be checked. Format: `YYYY-MM-DD`. If not provided, today's date will be used by default.

#### Response

- **success** (`boolean`): Indicates whether the request was successful.
- **statusCode** (`number`): HTTP status code of the response.
- **message** (`string`): Descriptive message indicating the outcome of the request.
- **data** (`Array` of `Object`): Array containing information about available time slots.

##### Time Slot Object

- **startTime** (`string`): The start time of the available slot.
- **endTime** (`string`): The end time of the available slot.

#### Example Request

```sql
GET /api/check-availability?date=2024-06-15
```

#### Example Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
    {
      "startTime": "08:00",
      "endTime": "10:00"
    },
    {
      "startTime": "14:00",
      "endTime": "16:00"
    }
  ]
}
```

**Hints**:

- Parse the optional `date` query parameter from the request URL. If not provided, use today's date.
- Retrieve bookings for the specified date from your database using Mongoose.
- Define a function to find available time range based on the bookings retrieved. Compare booked time range to the total available time slots for the day.
- Return a response containing the available time slots in the specified format. Use `res.json()` to send the response.

**8\. Create a Booking (User Only)**

- **Route**: `POST /api/bookings`
- **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
```

`If the facility is unavailable during the requested time slot, an error response is returned.`

**9\. View All Bookings (Admin Only)**

- **Route**: `GET /api/bookings`
- **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero",
        "email": "programming.hero@example.com",
        "phone": "+1234567890",
        "role": "user",
        "address": "456 Elm Street"
      },
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

**10\. View Bookings by User (User Only)**

- **Route**: `GET /api/bookings/user`
- **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

**11\. Cancel a Booking (User Only)**

- **Route**: `DELETE /api/bookings/:id`
- **Headers**:

```plain
Authorization: Bearer JWT_TOKEN
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with professional-grade surface.",
      "pricePerHour": 30,
      "location": "123 Main Street",
      "isDeleted": false
    },
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "canceled"
  }
}
```

## Bonus Part (10 Marks):

### **1\. No Data Found:**

When retrieving data, if the database collection is empty or no matching data is found, return the message: "No data found."

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data": []
}
```

### **2.Error Handling:**

Implement proper error handling throughout the application. Use global error handling `middleware` to catch and handle errors, providing appropriate error responses with error messages.

**Error Response Object Should include the following properties:**

- success → false
- message → Error Type → Validation Error, Cast Error, Duplicate Entry
- errorMessages
- stack

**Sample Error Response**

```json
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: project index: email_1 dup key: { email: \\"user2@gmail.com\\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: project index: email_1 dup key: { email: \\"user2@gmail.com\\" }\\n    at H:\\\\next-level-development\\\\project-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\operations\\\\insert.ts:85:25\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\cmap\\\\connection_pool.ts:574:11\\n    at H:\\\\next-level-development\\\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```

###

### **3\. Not Found Route:**

Implement a global "Not Found" handler for unmatched routes. When a route is not found, respond with a generic message: "Not Found.”

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found"
}
```

### **4\. Authentication Middleware:**

Implement an Authentication Middleware to authenticate your application. Ensures that only user and admin can access their own accessible routes.

```json
{
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route"
}
```

### **5\. Zod Validation:**

The API employs Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.

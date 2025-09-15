---
sidebar_position: 10
---
# HTTP Methods

HTTP Methods: The Verbs of Web Communication


HTTP (Hypertext Transfer Protocol) methods, also known as HTTP verbs, indicate the desired action to be performed for a given resource. They are a fundamental part of how web clients (like your browser) communicate with web servers. Common Methods are GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH  

## Here are the most common HTTP methods:

### GET
**Purpose**: Retrieves data from a specified resource. It should only be used to request data and should not have any other effect on the server (i.e., it should be "safe" and "idempotent").  

**Example**: Requesting a webpage or an image.
### POST
**Purpose**: Sends data to the server to create a resource or update an existing one. Often used when submitting forms.  

**Example**: Submitting login credentials, adding a new comment.  

### PUT
**Purpose**: Replaces all current representations of the target resource with the request payload. Used to update an existing resource or create one if it doesn't exist.  

**Example**: Updating a user's entire profile.  

### DELETE
**Purpose**: Removes the specified resource.  

**Example**: Deleting a user account or a specific post.  

### HEAD
**Purpose**: Similar to GET, but it asks for a response identical to that of a GET request, but without the response body. Useful for checking what a GET request would return before actually downloading it.  

**Example**: Checking if a resource exists or its size (via `Content-Length` header) without downloading the full content.  

### OPTIONS
**Purpose**: Describes the communication options for the target resource. It allows a client to determine the options (like which HTTP methods) are available for a resource.  

 **Example**: Checking which methods a server allows for a specific URL.  

### PATCH
**Purpose**: Applies partial modifications to a resource. Unlike PUT, which replaces the entire resource, PATCH only applies incremental changes.  

 
 **Example**: Updating only a specific field in a user's profile.  


#CRUD APP



##User Registration and Login:

   - Users can register by providing a unique username, email, and password.
   - Passwords are securely hashed before storing in the database.
   - Registered users can log in using their credentials.

##Create and Manage Blog Posts:

  -  Authenticated users can create new blog posts.
  -  Users can edit and update their own blog posts.
  -  They can also delete their blog posts if needed.

##Database Interaction with MongoDB:

  -  MongoDB is used to store user account information and blog posts.
   - Mongoose, an ODM (Object-Document Mapper), is utilized to interact with MongoDB from the Node.js application.

##Error Handling and Validation:

  -  Proper error handling is implemented to handle various scenarios, such as invalid requests or server errors.
   - Input data is validated to prevent invalid or malicious data from being stored.

##Middleware:

  -  Middleware functions are used to handle tasks like user authentication and error handling across different routes.
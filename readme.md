# Task Management API

Welcome to the Task Management API! 🎉 This API is designed to help you efficiently manage and track tasks for your employees, while ensuring robust security and smooth performance. Whether you're managing one or hundreds of tasks, our API provides a scalable and secure solution for your needs.
## 🚀 Features
✅ Task Management System

    Register, update, and track multiple tasks.
    Designed to help manage tasks effortlessly for your teams and employees.
    Support for assigning, prioritizing, and completing tasks.

## 🔐 Security First

    CPF Last Digits Validation: To ensure data integrity and verify the authenticity of user information, we implement CPF validation based on the last digits.
    JWT Encryption: Your data is safe with us. All passwords and task secrets are encrypted using JSON Web Tokens (JWT), providing robust authentication and security measures to protect sensitive data.

## ⚡ Powered by Nest.js

This API is built using Nest.js, a powerful, extensible framework for building efficient and scalable applications with TypeScript. Nest.js ensures high performance, clean architecture, and minimal boilerplate, so you can focus on building amazing features.
🔧 Installation

To get started with the Task Management API, follow these simple steps:

<ul>
    <li>
Clone this repository:
    </li>

    git clone https://github.com/Babiel09/Task-Managemant-API


<li>
Navigate to the project directory:
    </li>    
    
    cd task-management-api   
<li>
    Install the dependencies:
    </li>

    
    npm install
<li>
Set up your environment variables:
 </li>
<li>
Make sure you configure the necessary environment variables for your JWT secret and other sensitive data.
 </li>
<li>
Run the application:
 </li>
</ul>
    npm run start

Now your API is up and running! 🚀
## 📜 Endpoints
### USER:
    POST /user/v1 = Create a new user.
    GET /user/v1 = Get all users.
    GET /user/v1/:id = Get a specific user by ID.
    GET /user/v2 = Get all users only showing the name.
    PUT /user/v1/:id = Update a user by ID.
    DELETE /user/v1/:id = Delete a user by ID.


### TASK:
    POST /task/v1 = Create a new task.
    GET /task/v1 = Get all task.
    GET /task/v1/:id = Get a specific task by ID.
    PUT /task/v1/:id = Update a task by ID.
    DELETE /task/v1/:id = Delete a task by ID.


For full documentation on all available endpoints, authentication methods, and error handling, check out the API Docs.
## 🔐 Security

    JWT Authentication: Every request to secure endpoints requires a valid JWT token. Ensure you register and log in to get your token!
    Password Encryption: All sensitive information, such as passwords and task secrets, is encrypted using strong hashing algorithms before storage.

## 👨‍💻 Tech Stack

    Nest.js: A powerful framework for building efficient, scalable, and maintainable server-side applications.
    TypeScript: All code is written in TypeScript to provide type safety and improved developer experience.
    JWT (JSON Web Tokens): For secure authentication and information exchange.
    CPF Validation: Ensuring the integrity of CPF numbers by validating their last digits.

## 💡 Contributing

We welcome contributions to improve the Task Management API! If you'd like to contribute, feel free to fork this repository, submit a pull request, or open an issue if you find a bug or need a feature.
## 📣 Acknowledgements

    Nest.js: For providing a solid foundation to build scalable and efficient APIs.
    JWT: For secure token-based authentication and encryption.
    CPF Validation Libraries: For ensuring proper Brazilian CPF validation.

## 💬 Support

For questions, feedback, or support, don't hesitate to reach out! You can open an issue here on GitHub or contact us via [support email].

Thank you for using the Task Management API! 🙌 We hope it helps you streamline your task management processes with ease and security.
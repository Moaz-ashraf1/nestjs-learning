# NestJS Basics

## What is NestJS?

NestJS is a backend framework built on Node.js and TypeScript.

I already know that Express is a framework that runs on Node.js.

The main difference I understood is that Express gives me more freedom
in how I structure my application, while NestJS gives me a more
structured architecture.

---

## Modules

NestJS organizes the application into modules.

For example, in a Foodlify project I can have:

- UserModule
- ProductModule
- CartModule
- OrderModule

Each module groups the things related to a specific feature.

---

## Controllers

A Controller is responsible for receiving HTTP requests.

Example:

@Post('/api/products')

This tells Nest that when a POST request comes to
/api/products, the corresponding method should be executed.

---

## Request Body

@Body() tells Nest where the value of the parameter should come from.

Example:

@Body() body

This means that the value of `body` comes from the HTTP request body.

If the client sends:

{
  "name": "iPhone",
  "price": 30000
}

Then `body` contains this object.

---

## Dependency Injection

A Controller can depend on a Service.

For example:

CartController
    ↓
CartService

Instead of creating the service manually using:

new CartService()

I tell Nest that my Controller needs CartService:

constructor(private readonly cartService: CartService)

Nest then provides the service because it is registered as a provider
inside the module.

This reduces coupling and makes the application easier to maintain
and test.

---

## Exception Handling

In NestJS, I don't always need to use try/catch just to return an HTTP error.

For example:

throw new NotFoundException('Product not found');

Nest's built-in exception handling can catch the exception and turn it
into an appropriate HTTP response.
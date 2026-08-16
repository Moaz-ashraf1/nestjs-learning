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

## Express Under the Hood

NestJS uses Express as its default HTTP adapter.

This means that NestJS uses Express under the hood to handle
HTTP requests and responses.

NestJS also supports Fastify as an alternative HTTP adapter.

---

## NestJS Way vs Express Way

In NestJS, the preferred way is to use NestJS decorators:

`typescript
@Post('/api/products')
createProduct(@Body() body: CreateProductDto) {
return body;
}

NestJS handles the HTTP response automatically when I return a value.

---

Express Way

NestJS also allows us to access the underlying Express Request and Response objects.

@Post('/api/products')
createProduct(
@Req() req: Request,
@Res() res: Response,
) {
console.log(req.body);

res.json({
message: 'Product created',
});
}

Here, I am dealing with the Express Request and Response directly.

---

@Req()

@Req() gives me access to the complete HTTP Request object.

@Post('/api/products')
createProduct(@Req() req: Request) {
console.log(req.body);
}

Since NestJS uses Express by default, this can be the Express Request object.

I can access things such as:

req.body
req.params
req.query
req.headers

---

@Res()

@Res() gives me access to the underlying Response object.

@Post('/api/products')
createProduct(@Res() res: Response) {
res.status(201).json({
message: 'Product created',
});
}

I can use Express Response methods such as:

res.json()
res.status()
res.cookie()

When I use @Res() normally, I become responsible for sending the response.

---

@Res({ passthrough: true })

Sometimes I need the Express Response object to modify the response, but I still want NestJS to handle the response normally.

For example, I may need to set a cookie:

@Post('/login')
login(@Res({ passthrough: true }) res: Response) {
res.cookie('access_token', 'abc123');

return {
message: 'Logged in successfully',
};
}

Here:

res.cookie() modifies the HTTP response.

return allows NestJS to handle the response body.

passthrough: true allows me to use the Response object without taking full control of the response.

---

@Headers()

NestJS provides the @Headers() decorator to access HTTP request headers.

I can get all headers:

@Get()
getProducts(@Headers() headers: any) {
console.log(headers);
}

Or I can get a specific header:

@Get()
getProducts(
@Headers('authorization') authorization: string,
) {
console.log(authorization);
}

---

@Headers() vs req.headers

I can also access headers through the Express Request:

@Get()
getProducts(@Req() req: Request) {
console.log(req.headers);
}

But in NestJS, it is usually cleaner to use the specific decorator when I only need the headers:

@Headers()

The decorator extracts the required data from the underlying request.

Conceptually:

@Body()
↓
Request Body

@Headers()
↓
Request Headers

@Param()
↓
URL Parameters

@Query()
↓
Query Parameters

@Req()
↓
The complete Request object

@Res()
↓
The Response object

---

Express Request Types

When using the Express Request and Response types, I can import them as type-only imports:

import type { Request, Response } from 'express';

This is because Request and Response are TypeScript types in this context.

---

Typing the Request Body

Express's Request type supports generics, so I can specify the expected type of the request body.

For example:

type CreateProductBody = {
title: string;
price: number;
};

Then:

@Req() req: Request<{}, {}, CreateProductBody>

Now TypeScript knows the expected structure of:

req.body

So:

req.body.title

is a string, and:

req.body.price

is a number.

---

NestJS Decorators vs Express Objects

The preferred approach in NestJS is to use NestJS decorators when possible:

@Body()
@Param()
@Query()
@Headers()

These decorators allow me to work with only the part of the request that I actually need.

I should use:

@Req()
@Res()

when I specifically need access to the underlying Request or Response objects.

---

Main Idea

NestJS uses Express by default under the hood to handle HTTP requests and responses.

However, NestJS provides its own decorators and abstractions to make working with HTTP requests easier and cleaner.

I can still access the underlying Express objects when I need more control or need Express-specific functionality.

The important distinction is:

NestJS Way
↓
@Body()
@Param()
@Query()
@Headers()
return data

Express Way
↓
@Req()
@Res()
req.body
req.headers
res.json()
res.cookie()

In normal NestJS development, I should prefer the NestJS way and only use the Express Request/Response objects when I actually need them

# Messaging web app built with React

## Table of contents

1. [Overview](#overview)
2. [Learning Objectives](#objectives)
3. [Features](#features)
4. [How to install](#install)
5. [Demos](#demos)
6. [API Spec](#api)

<a id="overview"></a>

## 1. Overview

![Main demo](assets/Main%20demo.gif)

This is the server side of the application.
The client can be found [here](https://github.com/PBara7a/chat-app-client).

App built with React, Bootstrap, Node.js, Express, Socket.io, Prisma and PostgreSQL.

- A unique contact number is attributed to every registered user.
- Users can send messages to other individual users or to group chats.
- The message content is encrypted and decrypted on the client side.

<a id="objectives"></a>

## 2. Learning Objectives

- Understand the advantages and use the useContext hook to share data between components, as an alternative to props.
- Allow the user to perform create, read, update and delete operations on data.
- Learn the basics of websockets and how to maintain two-way real-time interactive communication between client and server.
- How to implement end-to-end encryption.
- Consuming and external API (Tenor).

<a id="features"></a>

## 3. Features

- Data is stored in persistent storage.
- The user can manage their contact list.
- Messages can be sent to individual users or groups of users.
- Users can make their communications more engaging by sharing animated gifs in their chats.
- Messages are protected by end-to-end encryption.
- Contacts and chats can be filtered by name.

<a id="install"></a>

## 4. How to install

1. Fork and clone this repository
2. Install dependencies
   ```sh
   npm install
   ```
3. Create your .env file, use .env.example as a reference.
4. Start the server
   ```sh
    npm start
   ```
5. Get the client up and running. Follow instructions [here](https://github.com/PBara7a/chat-app-client).

<a id="demos"></a>

## 5. Demos

### Register user

![Register user demo](assets/Register%20user%20demo.gif)

### Add new contact

![Add new contact demo](assets/New%20contact%20demo.gif)

### Start new chat

![Start new chat demo](assets/New%20chat%20demo.gif)

### Send animated gifs

![Sending gifs demo](assets/GIF%20demo.gif)

### Filter contacts/chats

![Filter contacts or chats demo](assets/Filter%20demo.gif)

<a id="license"></a>

<a id="api"></a>

## 6. API Spec

<details>
<summary>
<strong>POST /</strong>
</summary>

<strong>Example body</strong>

```sh
{
	"email": "test@test.com",
	"password": "test1"
}
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1OTM1MDgyMSwiZXhwIjoxNjU5NDM3MjIxfQ.eNaNnSN9X8TAVVKB3IvPza51rtL7DycK6P4XEAYGbUs",
		"user": {
			"id": 1,
			"first_name": "Paulo",
			"last_name": "Barata",
			"email": "test@test.com",
			"number": 854865282
		}
	}
}
```

</details>

<details>
<summary><strong>POST /users</strong>
</summary>

<strong>Example body</strong>

```sh
{
	"first_name": "Stef",
	"last_name": "Aranga",
	"email": "test6@test.com",
	"password": "test1"
}
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY1OTM1MjYyMywiZXhwIjoxNjU5NDM5MDIzfQ.Vg-LBDOjMOus6G8vV_yHkq5yfg3KNsANw41xZPL_F4Y",
		"user": {
			"id": 7,
			"first_name": "Stef",
			"last_name": "Aranga",
			"email": "test6@test.com",
			"number": 92790341
		}
	}
}
```

</details>

<details>
<summary><strong>POST /users/:id/contacts</strong>
</summary>

<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example body</strong>

```sh
{
	"number": 948036125
}
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"user": {
			"id": 1,
			"first_name": "Paulo",
			"last_name": "Barata",
			"email": "test@test.com",
			"number": 854865282,
			"contacts": [
				{
					"id": 5,
					"email": "test4@test.com",
					"password": "$2b$08$uUufSR08oX.F3iIOfP0eIOXWRKO1515/rgMcXXxcLRpBZMlj0rT5u",
					"number": 948036125
				}
			]
		}
	}
}
```

</details>

<details>
<summary><strong>POST /conversations</strong>
</summary>
<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example body</strong>

```sh
{
	"owner_id": 1,
	"name": "Work group chat",
	"participants": [3 ,4]
}
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"id": 6,
		"owner_id": 1,
		"name": "Work group chat"
	}
}
```

</details>

<details>
<summary><strong>POST /messages</strong>
</summary>
<em>Only auth tokens for users with the TEACHER role can use this route</em>

<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example body</strong>

```sh
{
	"sender_id": 1,
	"conversation_id": 2,
	"text": "Hi, from insomnia"
}
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"id": 25,
		"sender_id": 1,
		"conversation_id": 2,
		"text": "Hi, from insomnia"
	}
}
```

</details>

<details>
<summary><strong>GET /users/:id</strong>
</summary>
<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"user": {
			"id": 1,
			"first_name": "Paulo",
			"last_name": "Barata",
			"email": "test@test.com",
			"number": 854865282,
			"contacts": [
				{
					"id": 5,
					"email": "test4@test.com",
					"password": "$2b$08$uUufSR08oX.F3iIOfP0eIOXWRKO1515/rgMcXXxcLRpBZMlj0rT5u",
					"number": 948036125,
					"profile": {
						"id": 5,
						"userId": 5,
						"firstName": "Jeremias",
						"lastName": "Box"
					}
				}
			],
			"conversations": [
				{
					"id": 5,
					"ownerId": 1,
					"name": "Bob Pattel"
				},
				{
					"id": 6,
					"ownerId": 1,
					"name": "Work group chat"
				}
			]
		}
	}
}
```

</details>

<details>
<summary><strong>GET /users/:id/contacts</strong>
</summary>
<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": [
		{
			"id": 5,
			"email": "test4@test.com",
			"number": 948036125,
			"firstName": "Jeremias",
			"lastName": "Box"
		}
	]
}
```

</details>

<details>
<summary><strong>GET /conversations/:userId</strong>
</summary>

<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": [
		{
			"id": 1,
			"owner_id": 1,
			"name": "Group chat",
			"participants": [
				{
					"id": 1,
					"email": "test@test.com",
					"password": "$2b$08$sQQ68tLLvwoF1PJwR.x5oe.NNKt.ivispm7xjpbCRlFJfk/CKC21S",
					"number": 28261683,
					"profile": {
						"id": 1,
						"userId": 1,
						"firstName": "Paulo",
						"lastName": "Barata"
					}
				},
				{
					"id": 2,
					"email": "test1@test.com",
					"password": "$2b$08$9uh8a3eHOFAa63bNa7tqaOwpM8bYguFLlMh65NjXQS1Gqc.hYksSK",
					"number": 308496644,
					"profile": {
						"id": 2,
						"userId": 2,
						"firstName": "Oscar",
						"lastName": "Badjoras"
					}
				},
				{
					"id": 3,
					"email": "test2@test.com",
					"password": "$2b$08$T0sCYnezQVxAflrr06Ao0O1lC0pfUiaRyS2yIwg.VIwKObEaTLZyK",
					"number": 497768546,
					"profile": {
						"id": 3,
						"userId": 3,
						"firstName": "Bob",
						"lastName": "Pattel"
					}
				}
			],
			"messages": [
				{
					"id": 1,
					"senderId": 1,
					"conversationId": 1,
					"text": "Hi",
					"sender": {
						"id": 1,
						"email": "test@test.com",
						"password": "$2b$08$sQQ68tLLvwoF1PJwR.x5oe.NNKt.ivispm7xjpbCRlFJfk/CKC21S",
						"number": 28261683,
						"profile": {
							"id": 1,
							"userId": 1,
							"firstName": "Paulo",
							"lastName": "Barata"
						}
					}
				},
				{
					"id": 2,
					"senderId": 2,
					"conversationId": 1,
					"text": "Hi, how are you?",
					"sender": {
						"id": 2,
						"email": "test1@test.com",
						"password": "$2b$08$9uh8a3eHOFAa63bNa7tqaOwpM8bYguFLlMh65NjXQS1Gqc.hYksSK",
						"number": 308496644,
						"profile": {
							"id": 2,
							"userId": 2,
							"firstName": "Oscar",
							"lastName": "Badjoras"
						}
					}
				},
				{
					"id": 3,
					"senderId": 1,
					"conversationId": 1,
					"text": "Good",
					"sender": {
						"id": 1,
						"email": "test@test.com",
						"password": "$2b$08$sQQ68tLLvwoF1PJwR.x5oe.NNKt.ivispm7xjpbCRlFJfk/CKC21S",
						"number": 28261683,
						"profile": {
							"id": 1,
							"userId": 1,
							"firstName": "Paulo",
							"lastName": "Barata"
						}
					}
				}
			]
		}
	]
}
```

</details>

<details>
<summary><strong>PATCH /users/:id/contacts</strong>
</summary>

<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example body</strong>

```sh
{
	"number": 497768546
}
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"user": {
			"id": 1,
			"first_name": "Paulo",
			"last_name": "Barata",
			"email": "test@test.com",
			"number": 28261683,
			"contacts": [
				{
					"id": 2,
					"email": "test1@test.com",
					"password": "$2b$08$9uh8a3eHOFAa63bNa7tqaOwpM8bYguFLlMh65NjXQS1Gqc.hYksSK",
					"number": 308496644
				}
			]
		}
	}
}
```

</details>

<details>
<summary><strong>DELETE /messages/:id</strong>
</summary>

<strong>Headers</strong>

```sh
Authorization: Bearer &lt;token&gt;
```

<strong>Example response</strong>

```sh
{
	"status": "success",
	"data": {
		"id": 3,
		"sender_id": 1,
		"conversation_id": 1,
		"text": "Good"
	}
}
```

</details>

## API Spec

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

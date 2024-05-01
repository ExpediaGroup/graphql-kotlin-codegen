---
sidebar_position: 5
---

# Class Consolidation

In GraphQL, it's common to have input types that mirror output types. For example, you might have a `UserInput` type for creating a user and a `User` type for querying a user. These types might have the same fields but are treated as separate types in GraphQL.

With the class consolidation feature, GraphQL Kotlin Codegen can detect when these types are equivalent and consolidate them into a single Kotlin class.
If this class functions in your resolver code as both an input and an output type, GraphQL Kotlin will subsequently
transform it into the separate input and output types we started with.

## How It Works

The class consolidation feature works by comparing the fields of input and output types. If the fields and their types
are exactly the same, the types are considered equivalent.

Here's an example:

```graphql
input UserInput {
  name: String!
  email: String!
}

type User {
  name: String!
  email: String!
}
```

In this case, `UserInput` and `User` have the same fields, so they would be consolidated into a single Kotlin class:

```kotlin
data class User(
  val name: String,
  val email: String
)
```

This also works recursively. If the fields of a type are themselves input or output types, they will be consolidated as well.

```graphql
input UserInput {
  name: NameInput!
  email: String!
}

input NameInput {
  first: String!
  last: String!
}

type User {
  name: Name!
  email: String!
}

type Name {
  first: String!
  last: String!
}
```

```kotlin
data class User(
  val name: Name,
  val email: String
)

data class Name(
  val first: String,
  val last: String
)
```

## Limitations

The class consolidation feature only works with types that have the same fields with the same types.
If the fields are different, the types will not be consolidated. Instead, individual classes will be generated with the
`@GraphQLValidObjectLocations` annotation, enforcing that the class can only be used as either an input or output type.
Check out the [GraphQL Kotlin docs](https://opensource.expediagroup.com/graphql-kotlin/docs/schema-generator/customizing-schemas/restricting-input-output)
to learn more about this annotation.

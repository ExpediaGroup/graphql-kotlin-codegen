---
sidebar_position: 6
---

# Inheritance

When dealing with GraphQL schema containing [field arguments](https://graphql.com/learn/arguments/),
generating Kotlin code can be a bit tricky. This is because the generated code cannot in itself be the implementation
in a resolver.

Here's an example:

```graphql
type Query {
  resolveMyType: MyType!
}

type MyType {
  resolveMe(input: String!): String!
}
```

Generated Kotlin:

```kotlin
package com.types.generated

open class Query {
  open fun resolveMyType(): MyType = throw NotImplementedError("Query.resolveMyType must be implemented.")
}

open class MyType {
  open fun resolveMe(input: String): String = throw NotImplementedError("MyType.resolveMe must be implemented.")
}
```

Source code:

```kotlin
import com.expediagroup.graphql.generator.annotations.GraphQLIgnore
import com.expediagroup.graphql.server.operations.Query
import com.types.generated.MyType as MyTypeInterface
import com.types.generated.Query as QueryInterface

class MyQuery : Query, QueryInterface() {
  override fun resolveMyType(): MyTypeInterface = MyType()
}

@GraphQLIgnore
class MyType : MyTypeInterface() {
  override fun resolveMe(input: String): String = "Hello world!"
}
```

As you can see, the generated code is not part of the implementation. Rather, it becomes an interface to inherit from in your implementation.
This enforces a type contract between the schema and your resolver code.

## Top Level Types

When dealing with top-level types, such as `Query` or `Mutation`, you can inherit from the generated class directly. This is because the generated class is open by default.

Given the following executable schema:

```graphql
type Query {
  foo: String!
  bar: String!
}
```

You might want to separate the implementation into multiple classes like so:

```kotlin
import com.expediagroup.graphql.server.operations.Query

class FooQuery : Query {
  override fun foo(): String = "Hello"
}

class BarQuery : Query {
  override fun bar(): String = "World"
}
```

However, if you try to inherit from the generated `Query` class, you will get an error during schema generation.

```kotlin
import com.expediagroup.graphql.server.operations.Query
import com.types.generated.Query as QueryInterface

class FooQuery : Query, QueryInterface() {
  override fun foo(): String = "Hello"
}

class BarQuery : Query, QueryInterface() {
  override fun bar(): String = "World"
}
```

This is because the generated `Query` class contains both `foo` and `bar` fields, which causes a conflict when inherited by multiple implementation classes.

Instead, you should inherit from the field-level generated `Query` classes like so:

```kotlin
import com.expediagroup.graphql.server.operations.Query
import com.types.generated.FooQuery as FooQueryInterface
import com.types.generated.BarQuery as BarQueryInterface

class FooQuery : Query, FooQueryInterface() {
  override fun foo(): String = "Hello"
}

class BarQuery : Query, BarQueryInterface() {
  override fun bar(): String = "World"
}
```

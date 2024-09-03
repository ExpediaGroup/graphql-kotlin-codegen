---
sidebar_position: 4
---

# Recommended Usage

In general, the `resolverInterfaces` config should be used to generate more performant code. This is especially important
when dealing with expensive operations, such as database queries or network requests. When at least one field has
arguments in a type, we generate an open class with function signatures to be inherited in source code.
However, when fields have no arguments, we generate data classes by default.

## Example

The following example demonstrates the problem with using generated data classes to implement your resolvers with GraphQL Kotlin.

Say you want to implement the schema below:

```graphql
type Query {
  resolveMyType(input: String!): MyType
}

type MyType {
  foo: String!
  bar: String
}
```

### Here is the default behavior.

Generated Kotlin:

```kotlin
package com.types.generated

open class Query {
  open fun resolveMyType(input: String): MyType = throw NotImplementedError("Query.resolveMyType must be implemented.")
}

data class MyType(
  val foo: String,
  val bar: String? = null
)
```

Source code:

```kotlin
import com.expediagroup.graphql.server.operations.Query
import com.types.generated.MyType
import com.types.generated.Query as QueryInterface

class MyQuery : Query, QueryInterface() {
  override fun resolveMyType(input: String): MyType =
    MyType(
      foo = myExpensiveCall1(),
      bar = myExpensiveCall2()
    )
}
```

The resulting source code is extremely unperformant. The `MyType` class is a data class, which means
that the `foo` and `bar` properties are both initialized when the `MyType` object is created, and
`myExpensiveCall1()` and `myExpensiveCall2()` will both be called in sequence! Even if I only query for `foo`, not
only will `myExpensiveCall2()` still run, but it will also wait until `myExpensiveCall1()` is totally finished.

### Instead, use the `resolverInterfaces` config!

Codegen config:

```ts
import { GraphQLKotlinCodegenConfig } from "@expediagroup/graphql-kotlin-codegen";

export default {
  resolverInterfaces: [
    {
      typeName: "MyType",
    },
  ],
} satisfies GraphQLKotlinCodegenConfig;
```

Generated Kotlin:

```kotlin
package com.types.generated

open class Query {
  open fun resolveMyType(input: String): MyType = throw NotImplementedError("Query.resolveMyType must be implemented.")
}

open class MyType {
  open fun foo(): String = throw NotImplementedError("MyType.foo must be implemented.")
  open fun bar(): String? = throw NotImplementedError("MyType.bar must be implemented.")
}
```

Source code:

```kotlin
import com.types.generated.Query as QueryInterface
import com.types.generated.MyType as MyTypeInterface

class MyQuery : Query, QueryInterface() {
    override fun resolveMyType(input: String): MyType = MyType()
}

class MyType : MyTypeInterface() {
  override fun foo(): String = myExpensiveCall1()
  override fun bar(): String? = myExpensiveCall2()
}
```

This code is much more performant! The `MyType` class is no longer a data class, so the `foo` and `bar` properties
can now be resolved independently of each other. If I query for only `foo`, only `myExpensiveCall1()` will be called, and
if I query for only `bar`, only `myExpensiveCall2()` will be called.

Check out the [related GraphQL Kotlin docs](https://opensource.expediagroup.com/graphql-kotlin/docs/schema-generator/execution/fetching-data/) for more information on this topic.

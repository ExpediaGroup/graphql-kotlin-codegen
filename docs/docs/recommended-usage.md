---
sidebar_position: 4
---

# Recommended Usage

In general, the `resolverClasses` config should be used to generate more performant code. This is especially important
when dealing with expensive operations, such as database queries or network requests. When at least one field has
arguments in a type, we generate an extension class to be inherited in source code. However, when fields have no
arguments, we generate data classes by default.

## Example

The following demonstrates the problem with using generated data classes to implement your resolvers with GraphQL Kotlin.

Say you want to implement the schema below:

```graphql
type Query {
  resolveMyType(input: String!): MyType
}

type MyType {
  field1: String!
  field2: String
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
  val field1: String,
  val field2: String? = null
)
```

Source code:

```kotlin
import com.expediagroup.graphql.server.operations.Query
import com.expediagroup.sharedGraphql.generated.Query as QueryInterface
import com.types.generated.MyType

class MyQuery : Query, QueryInterface() {
  override suspend fun resolveMyType(input: String): MyType =
    MyType(
      field1 = myExpensiveCall1(),
      field2 = myExpensiveCall2()
    )
}

```

The resulting source code is at risk of being extremely unperformant. The `MyType` class is a data class, which means
that the `field1` and `field2` properties are both initialized when the `MyType` object is created, and
`myExpensiveCall1()` and `myExpensiveCall2()` will both be called in sequence! Even if I only query for `field1`, not
only will `myExpensiveCall2()` still run, but it will also wait until `myExpensiveCall1()` is totally finished.

### Instead, use the `resolverClasses` config!

Codegen config:

```ts
import { GraphQLKotlinCodegenConfig } from "@expediagroup/graphql-kotlin-codegen";

export default {
  resolverClasses: [
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
  open fun field1(): String = throw NotImplementedError("MyType.field1 must be implemented.")
  open fun field2(): String? = throw NotImplementedError("MyType.field2 must be implemented.")
}
```

Source code:

```kotlin
import com.types.generated.MyType as MyTypeInterface
import com.expediagroup.graphql.generator.annotations.GraphQLIgnore

class MyQuery : Query, QueryInterface() {
    override suspend fun resolveMyType(input: String): MyType = MyType()
}

@GraphQLIgnore
class MyType : MyTypeInterface() {
  override fun field1(): String = myExpensiveCall1()
  override fun field2(): String? = myExpensiveCall2()
}
```

This code is much more performant. The `MyType` class is no longer a data class, so the `field1` and `field2` properties
can now be resolved independently of each other. If I query for only `field1`, only `myExpensiveCall1()` will be called, and
if I query for only `field2`, only `myExpensiveCall2()` will be called.

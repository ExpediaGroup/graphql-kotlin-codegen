package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

data class MyType3(
    val field: String? = null
)

data class MyType4(
    val field: String? = null
)

@GraphQLUnion(
    name = "MyUnion1",
    possibleTypes = [MyType3::class, MyType4::class],
    description = ""
)
annotation class MyUnion1

@GraphQLUnion(
    name = "MyUnion2",
    possibleTypes = [MyType3::class, MyType4::class],
    description = ""
)
annotation class MyUnion2

data class MyMultiUnionType(
    @MyUnion1
    val field: Any? = null,
    @MyUnion2
    val field2: Any? = null
)

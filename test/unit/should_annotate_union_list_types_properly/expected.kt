package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType1")
data class MyType1(
    val field: String? = null
)

data class MyType2(
    val field: String? = null
)

@GraphQLUnion(
    name = "MyUnion",
    possibleTypes = [MyType1::class, MyType2::class],
    description = "A description for MyUnion"
)
annotation class MyUnion

data class MyUnionListType(
    @MyUnion
    @GraphQLDescription("A description for field")
    val field: List<Any>? = null,
    @MyUnion
    val field2: List<Any?>? = null
)

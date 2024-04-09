package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyDirectiveType")
@SomeAnnotation1
@SomeAnnotation2
@SomeAnnotation3(arg1: "arg1", arg2: 0)
data class MyDirectiveType(
    val field: String? = null
)

@SomeAnnotation1
@SomeAnnotation2
@GraphQLUnion(
    name = "MyDirectiveUnion",
    possibleTypes = [MyDirectiveType::class],
    description = "A description for MyDirectiveUnion"
)
annotation class MyDirectiveUnion

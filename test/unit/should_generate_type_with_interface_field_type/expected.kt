package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyInterface")
interface MyInterface {
    val field: String?
    val field2: String
}

data class MyInterfaceFieldType(
    val field: MyInterface? = null,
    val field2: MyInterface
)

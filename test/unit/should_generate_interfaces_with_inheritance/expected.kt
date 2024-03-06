package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyInterface")
interface MyInterface {
    val field: String?
    val field2: String
}

@GraphQLDescription("A description for MyInterfaceImplementation")
data class MyInterfaceImplementation(
    override val field: String? = null,
    override val field2: String
) : MyInterface

interface MyInterface1 {
    val field: String?
}

interface MyInterface2 {
    val field2: String
}

data class MyMergedInterfaceImplementation(
    override val field: String? = null,
    override val field2: String
) : MyInterface1, MyInterface2

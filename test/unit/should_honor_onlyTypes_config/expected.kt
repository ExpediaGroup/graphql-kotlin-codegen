package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

data class MyType(
    val username: String? = null,
    @GraphQLDescription("A description for email")
    val email: String? = null,
    @GraphQLDescription("A `weird` description for name")
    val name: String? = null
)

@GraphQLDescription("A description for MyEnum")
enum class MyEnum(val value: String) {
    This("THIS"),
    @GraphQLDescription("A description for THAT")
    That("THAT");

    companion object {
        fun findByName(name: String): MyEnum? = values().find { it.name == name }
        fun findByValue(value: String): MyEnum? = values().find { it.value == value }
    }
}

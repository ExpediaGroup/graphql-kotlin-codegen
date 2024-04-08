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
enum class MyEnum {
    This,
    @GraphQLDescription("A description for THAT")
    That;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): MyEnum? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

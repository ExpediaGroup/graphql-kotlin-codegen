package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyEnum")
enum class MyEnum {
    This,
    @GraphQLDescription("A description for THAT")
    That;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): MyEnum? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

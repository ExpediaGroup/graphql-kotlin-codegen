package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyEnum")
enum class MyEnum {
    THIS,
    @GraphQLDescription("A description for THAT")
    THAT;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): MyEnum? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

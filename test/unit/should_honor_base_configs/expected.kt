package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyEnum")
enum class EnumHonoringBaseConfigs {
    THIS,
    @GraphQLDescription("A description for THAT")
    THAT;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): EnumHonoringBaseConfigs? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

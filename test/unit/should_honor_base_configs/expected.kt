package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyEnum")
enum class MyEnum(val label: String) {
    THIS("THIS"),
    @GraphQLDescription("A description for THAT")
    THAT("THAT");

    companion object {
        @JvmStatic
        fun valueOfLabel(label: String): MyEnum? {
            return values().find { it.label == label }
        }
    }
}

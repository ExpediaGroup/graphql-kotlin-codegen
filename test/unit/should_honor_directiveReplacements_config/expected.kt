package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_directiveReplacements_config.*

@GraphQLDescription("A description for MyDirectiveType")
@SomeAnnotation1
@SomeAnnotation2
data class TypeHonoringDirectiveReplacements(
    val field: String? = null
)

@SomeAnnotation1
@SomeAnnotation2
@GraphQLUnion(
    name = "MyDirectiveUnion",
    possibleTypes = [TypeHonoringDirectiveReplacements::class],
    description = "A description for MyDirectiveUnion"
)
annotation class MyDirectiveUnion

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_directiveReplacements_config.*

@GraphQLDescription("A description for MyDirectiveType")
@SomeAnnotation1
@SomeAnnotation2
@SomeAnnotationWithArgs(arg1 = "arg1", arg2 = 0)
data class TypeHonoringDirectiveReplacements(
    val field: String? = null
) : MyDirectiveUnion

@GraphQLDescription("A description for MyDirectiveUnion")
@SomeAnnotation1
@SomeAnnotation2
interface MyDirectiveUnion

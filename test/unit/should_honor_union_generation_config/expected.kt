package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for TypeForHonoringUnionGenerationConfig1")
data class TypeForHonoringUnionGenerationConfig1(
    val field: String? = null
)

data class TypeForHonoringUnionGenerationConfig2(
    val field: String? = null
)

@GraphQLUnion(
    name = "UnionAsAnnotation",
    possibleTypes = [TypeForHonoringUnionGenerationConfig1::class, TypeForHonoringUnionGenerationConfig2::class],
    description = "A description for UnionAsAnnotation"
)
annotation class UnionAsAnnotation

data class UnionForHonoringUnionGenerationConfig(
    @UnionAsAnnotation
    @GraphQLDescription("A description for field")
    val field: Any? = null,
    @UnionAsAnnotation
    @GraphQLDescription("DEPRECATED: It uses the GraphQLDescription annotation for union annotations")
    val field2: Any? = null
)

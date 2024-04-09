package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType1")
data class TypeForGeneratingUnionTypesProperly1(
    val field: String? = null
)

data class TypeForGeneratingUnionTypesProperly2(
    val field: String? = null
)

@GraphQLUnion(
    name = "UnionForGeneratingUnionsProperly",
    possibleTypes = [TypeForGeneratingUnionTypesProperly1::class, TypeForGeneratingUnionTypesProperly2::class],
    description = "A trimmed description for UnionForGeneratingUnionsProperly"
)
annotation class UnionForGeneratingUnionsProperly

data class MyUnionType(
    @UnionForGeneratingUnionsProperly
    @GraphQLDescription("A description for field")
    val field: Any? = null,
    val field2: String? = null
)

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType1")
data class TypeForGeneratingUnionTypesProperly1(
    val field: String? = null
) : UnionForGeneratingUnionsProperly

data class TypeForGeneratingUnionTypesProperly2(
    val field: String? = null
) : UnionForGeneratingUnionsProperly

@GraphQLDescription("A trimmed description for UnionForGeneratingUnionsProperly")
interface UnionForGeneratingUnionsProperly

data class MyUnionType(
    @GraphQLDescription("A description for field")
    val field: UnionForGeneratingUnionsProperly? = null,
    val field2: String? = null
)

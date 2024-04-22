package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for TypeForGeneratingUnionListTypes1")
data class TypeForGeneratingUnionListTypes1(
    val field: String? = null
) : UnionForGeneratingUnionListTypes

data class TypeForGeneratingUnionListTypes2(
    val field: String? = null
) : UnionForGeneratingUnionListTypes

@GraphQLDescription("A description for UnionForGeneratingUnionListTypes")
interface UnionForGeneratingUnionListTypes

data class MyUnionListType(
    @GraphQLDescription("A description for field")
    val field: List<UnionForGeneratingUnionListTypes>? = null,
    val field2: List<UnionForGeneratingUnionListTypes?>? = null
)

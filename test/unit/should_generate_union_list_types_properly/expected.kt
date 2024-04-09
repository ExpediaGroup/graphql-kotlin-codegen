package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for TypeForGeneratingUnionListTypes1")
data class TypeForGeneratingUnionListTypes1(
    val field: String? = null
)

data class TypeForGeneratingUnionListTypes2(
    val field: String? = null
)

@GraphQLUnion(
    name = "UnionForGeneratingUnionListTypes",
    possibleTypes = [TypeForGeneratingUnionListTypes1::class, TypeForGeneratingUnionListTypes2::class],
    description = "A description for UnionForGeneratingUnionListTypes"
)
annotation class UnionForGeneratingUnionListTypes

data class MyUnionListType(
    @UnionForGeneratingUnionListTypes
    @GraphQLDescription("A description for field")
    val field: List<Any>? = null,
    @UnionForGeneratingUnionListTypes
    val field2: List<Any?>? = null
)

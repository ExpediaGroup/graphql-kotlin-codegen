package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType1")
data class TypeForNonNullableUnionList1(
    val field: String? = null
)

data class TypeForNonNullableUnionList2(
    val field: String? = null
)

@GraphQLUnion(
    name = "UnionForNonNullableList",
    possibleTypes = [TypeForNonNullableUnionList1::class, TypeForNonNullableUnionList2::class],
    description = "A description for UnionForNonNullableList"
)
annotation class UnionForNonNullableList

data class MyNonNullableUnionListType(
    @UnionForNonNullableList
    val field: List<Any> = emptyList(),
    @UnionForNonNullableList
    val field2: List<Any?> = emptyList()
)

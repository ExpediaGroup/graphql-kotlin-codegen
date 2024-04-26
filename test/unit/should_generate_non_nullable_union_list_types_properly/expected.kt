package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType1")
data class TypeForNonNullableUnionList1(
    val field: String? = null
) : UnionForNonNullableList

data class TypeForNonNullableUnionList2(
    val field: String? = null
) : UnionForNonNullableList

@GraphQLDescription("A description for UnionForNonNullableList")
interface UnionForNonNullableList

data class MyNonNullableUnionListType(
    val field: List<UnionForNonNullableList> = emptyList(),
    val field2: List<UnionForNonNullableList?> = emptyList()
)

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType1")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForNonNullableUnionList1(
    val field: String? = null
) : UnionForNonNullableList

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForNonNullableUnionList2(
    val field: String? = null
) : UnionForNonNullableList

@GraphQLDescription("A description for UnionForNonNullableList")
interface UnionForNonNullableList

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyNonNullableUnionListType(
    val field: List<UnionForNonNullableList> = emptyList(),
    val field2: List<UnionForNonNullableList?> = emptyList()
)

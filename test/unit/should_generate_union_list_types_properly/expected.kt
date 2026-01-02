package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for TypeForGeneratingUnionListTypes1")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForGeneratingUnionListTypes1(
    val field: String? = null
) : UnionForGeneratingUnionListTypes

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForGeneratingUnionListTypes2(
    val field: String? = null
) : UnionForGeneratingUnionListTypes

@GraphQLDescription("A description for UnionForGeneratingUnionListTypes")
interface UnionForGeneratingUnionListTypes

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyUnionListType(
    @param:GraphQLDescription("A description for field")
    val field: List<UnionForGeneratingUnionListTypes>? = null,
    val field2: List<UnionForGeneratingUnionListTypes?>? = null
)

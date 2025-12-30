package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType1")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForGeneratingUnionTypesProperly1(
    val field: String? = null
) : UnionForGeneratingUnionsProperly

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForGeneratingUnionTypesProperly2(
    val field: String? = null
) : UnionForGeneratingUnionsProperly

@GraphQLDescription("A trimmed description for UnionForGeneratingUnionsProperly")
interface UnionForGeneratingUnionsProperly

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyUnionType(
    @param:GraphQLDescription("A description for field")
    val field: UnionForGeneratingUnionsProperly? = null,
    val field2: String? = null
)

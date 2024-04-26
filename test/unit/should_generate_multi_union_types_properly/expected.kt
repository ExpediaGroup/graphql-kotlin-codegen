package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyType3(
    val field: String? = null
) : MyUnion1, MyUnion2

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyType4(
    val field: String? = null
) : MyUnion1, MyUnion2

interface MyUnion1

interface MyUnion2

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyMultiUnionType(
    val field: MyUnion1? = null,
    val field2: MyUnion2? = null
)

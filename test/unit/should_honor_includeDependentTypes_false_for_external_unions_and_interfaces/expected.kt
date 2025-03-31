package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyIncludedType(
    val field: String? = null,
    val field2: String
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyIncludedType2(
    val field: String? = null,
    val field2: String
) : MyIncludedUnion

interface MyIncludedUnion

interface MyIncludedInterfaceInOnlyTypes {
    val field: String?
    val field2: String
}

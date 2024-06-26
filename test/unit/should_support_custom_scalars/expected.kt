package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyScalarType(
    val idField: com.expediagroup.graphql.generator.scalars.ID? = null,
    val field: java.net.URL? = null,
    val field2: java.net.URL
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyCustomScalarType(
    val field: String? = null,
    val field2: String
)

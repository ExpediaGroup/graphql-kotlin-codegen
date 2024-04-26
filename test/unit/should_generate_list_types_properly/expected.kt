package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyListType(
    val field: List<String> = emptyList(),
    val field2: List<String?> = emptyList(),
    val field3: List<String>? = null,
    val field4: List<String?>? = null
)

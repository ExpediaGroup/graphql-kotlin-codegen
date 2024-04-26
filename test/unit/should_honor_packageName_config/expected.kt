package com.some.custom.name

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeHonoringPackageNameConfig(
    val field: String? = null
)

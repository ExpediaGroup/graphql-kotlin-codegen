package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_directiveReplacements_config.*

@GraphQLDescription("A description for MyDirectiveType")
@SomeAnnotation1
@SomeAnnotation2
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeHonoringDirectiveReplacementsMultipleDirectives(
    val field: String? = null
)

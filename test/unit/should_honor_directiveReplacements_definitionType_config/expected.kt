package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_directiveReplacements_config.*

@SomeAnnotation1
@CommonAnnotation
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeHonoringDirectiveReplacementsDefinitionType(
    val field: String? = null
)

@SomeAnnotation2
@CommonAnnotation
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyDirectiveTypeInput(
    val field: String? = null
)

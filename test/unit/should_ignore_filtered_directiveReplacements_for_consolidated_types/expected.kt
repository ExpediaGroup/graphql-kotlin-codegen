package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_directiveReplacements_config.*

@SomeAnnotation1
@SomeAnnotation2
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeThatShouldGetDirectiveReplacement(
    val field: String? = null
)

@SomeAnnotation2
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class InputTypeThatShouldNotGetDirectiveReplacement(
    val field: String? = null
)

data class MyConsolidatedTypeWithDirectives(
    val field: String? = null
)

@SomeAnnotation2
data class MyConsolidatedTypeWithDirectives2(
    val field: String? = null
)

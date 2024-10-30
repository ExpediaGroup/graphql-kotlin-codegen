package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_directiveReplacements_config.*

@SomeAnnotation1
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeHonoringDirectiveReplacementsDefinitionType(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class InputTypeThatShouldNotGetDirectiveReplacement(
    val field: String? = null
)

@SomeAnnotation2
enum class MyEnumWithDirectives {
    Value;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): MyEnumWithDirectives? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

data class MyConsolidatedTypeWithDirectives(
    val field: String? = null
)

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeHonoringOnlyTypesConfig(
    val field1: String? = null,
    @param:GraphQLDescription("A description for field2")
    val field2: String? = null,
    @param:GraphQLDescription("A `weird` description for name")
    val field3: String? = null
)

@GraphQLDescription("A description for MyEnum")
enum class EnumHonoringOnlyTypesConfig {
    This,
    @GraphQLDescription("A description for THAT")
    That;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): EnumHonoringOnlyTypesConfig? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

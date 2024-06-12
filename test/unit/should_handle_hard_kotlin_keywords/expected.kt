package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeWithReservedKotlinKeywords(
    val `as`: String? = null,
    val `break`: String? = null,
    val `is`: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class InputWithReservedKotlinKeywords(
    val `continue`: String? = null,
    val `class`: String? = null,
    val `do`: String? = null
)

enum class EnumWithReservedKotlinKeywords {
    `fun`,
    `package`,
    `val`;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): EnumWithReservedKotlinKeywords? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

interface InterfaceWithReservedKotlinKeywords {
    val `null`: String?
    val `return`: String?
    val `object`: String?
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForUnion1(
    val field: String? = null
) : `this`

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForUnion2(
    val field: String? = null
) : `this`

interface `this`

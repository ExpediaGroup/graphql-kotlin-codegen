package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_dependentTypesInScope_config.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeInOnlyTypes(
    val field: TypeInScope,
    val field2: TypeOutOfScope
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeInScope(
    val field: String? = null,
    val unionInScopeField: UnionInScope? = null,
    val unionOutOfScopeField: UnionOutOfScope? = null,
    val externalUnionAsInterfaceField: ExternalUnionAsInterface? = null
)

interface UnionInScope

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class Type1(
    val field: String? = null
) : UnionInScope, ExternalUnionAsInterface

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for TypeForHonoringUnionConfig1")
data class TypeForHonoringUnionConfig1(
    val field: String? = null
) : UnionAsMarkerInterface

data class TypeForHonoringUnionConfig2(
    val field: String? = null
) : UnionAsMarkerInterface

@GraphQLDescription("A description for UnionAsMarkerInterface")
interface UnionAsMarkerInterface

data class UnionForHonoringUnionConfig(
    @GraphQLDescription("A description for field")
    val field: UnionAsMarkerInterface? = null,
    val field2: String? = null
)

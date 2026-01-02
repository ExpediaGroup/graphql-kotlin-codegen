package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for TypeForHonoringUnionGenerationConfig1")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForHonoringUnionGenerationConfig1(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeForHonoringUnionGenerationConfig2(
    val field: String? = null
)

@GraphQLUnion(
    name = "UnionAsAnnotation",
    possibleTypes = [TypeForHonoringUnionGenerationConfig1::class, TypeForHonoringUnionGenerationConfig2::class],
    description = "A description for UnionAsAnnotation"
)
annotation class UnionAsAnnotation

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class UnionForHonoringUnionGenerationConfig(
    @param:UnionAsAnnotation
    @param:GraphQLDescription("A description for field")
    val field: Any? = null,
    @param:UnionAsAnnotation
    @param:GraphQLDescription("DEPRECATED: It uses the GraphQLDescription annotation for union annotations")
    val deprecated1: Any? = null,
    @param:UnionAsAnnotation
    @param:GraphQLDescription("DEPRECATED: It uses the GraphQLDescription annotation for union types")
    val deprecated2: Any? = null,
    @param:UnionAsAnnotation
    @param:GraphQLDescription("It uses the GraphQLDescription annotation for union types")
    val deprecated3: Any? = null,
    @param:UnionAsAnnotation
    @param:GraphQLDescription("It omits the @Deprecated annotation for now")
    val deprecated4: Any? = null
)

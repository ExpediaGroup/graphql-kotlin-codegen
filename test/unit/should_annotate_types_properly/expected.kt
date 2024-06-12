package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class TypeThatShouldBeProperlyAnnotated(
    val field: String? = null,
    @GraphQLDescription("A description for fieldWithDescription")
    val fieldWithDescription: String? = null,
    @GraphQLDescription("A `weird` description for weirdDescription")
    val weirdDescription: String? = null,
    @Deprecated("Use something else instead")
    val deprecated1: String? = null,
    @Deprecated("")
    val deprecated2: String? = null,
    @Deprecated("Deprecated directive works too")
    val deprecated3: String? = null,
    @Deprecated("It only takes the first one")
    val deprecated4: String? = null,
    @Deprecated("It uses the GraphQLDescription annotation for union types")
    val deprecated5: UnionThatShouldBeProperlyAnnotated? = null,
    @Deprecated("It uses the GraphQLDescription annotation for union types")
    val deprecated6: UnionThatShouldBeProperlyAnnotated? = null,
    @GraphQLDescription("When there is a description")
    @Deprecated("It uses the @Deprecated annotation for the reason")
    val deprecated7: UnionThatShouldBeProperlyAnnotated? = null,
    @Deprecated("Multiline reason")
    val deprecated8: String? = null
) : UnionThatShouldBeProperlyAnnotated

interface UnionThatShouldBeProperlyAnnotated

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class InputTypeThatShouldBeProperlyAnnotated(
    @Deprecated("this field is deprecated")
    val optionalField: String? = null,
    @GraphQLDescription("DEPRECATED: this field is deprecated")
    val requiredField: String
)

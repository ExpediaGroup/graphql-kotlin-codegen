package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType")
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
    @UnionThatShouldBeProperlyAnnotated
    @GraphQLDescription("DEPRECATED: It uses the GraphQLDescription annotation for union types")
    val deprecated5: Any? = null,
    @UnionThatShouldBeProperlyAnnotated
    @GraphQLDescription("It uses the GraphQLDescription annotation for union types")
    val deprecated6: Any? = null,
    @UnionThatShouldBeProperlyAnnotated
    @GraphQLDescription("When there is a description")
    val deprecated7: Any? = null,
    @Deprecated("Multiline reason")
    val deprecated8: String? = null
)

@GraphQLUnion(
    name = "UnionThatShouldBeProperlyAnnotated",
    possibleTypes = [TypeThatShouldBeProperlyAnnotated::class],
    description = ""
)
annotation class UnionThatShouldBeProperlyAnnotated

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType")
data class TypeThatShouldBeProperlyAnnotated(
    val username: String? = null,
    @GraphQLDescription("A description for email")
    val email: String? = null,
    @GraphQLDescription("A `weird` description for name")
    val name: String? = null,
    @Deprecated("Use something else instead")
    val deprecated1: String? = null,
    @Deprecated("")
    val deprecated2: String? = null,
    @Deprecated("Deprecated directive works too")
    val deprecated3: String? = null,
    @Deprecated("It only takes the first one")
    val deprecated4: String? = null,
    @MyUnion
    @GraphQLDescription("DEPRECATED: It uses the GraphQLDescription annotation for union types")
    val deprecated5: Any? = null,
    @MyUnion
    @GraphQLDescription("It uses the GraphQLDescription annotation for union types")
    val deprecated6: Any? = null,
    @MyUnion
    @GraphQLDescription("When there is a description")
    val deprecated7: Any? = null
)

@GraphQLUnion(
    name = "UnionThatShouldBeProperlyAnnotated",
    possibleTypes = [MyType::class],
    description = ""
)
annotation class UnionThatShouldBeProperlyAnnotated

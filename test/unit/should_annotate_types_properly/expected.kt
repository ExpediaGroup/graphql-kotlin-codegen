package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyType")
data class MyType(
    val username: String? = null,
    @GraphQLDescription("A description for email")
    val email: String? = null,
    @GraphQLDescription("A `weird` description for name")
    val name: String? = null
)

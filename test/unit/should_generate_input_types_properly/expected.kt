package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyInputType")
data class MyInputType(
    val username: String? = null,
    @GraphQLDescription("A description for email")
    val email: String? = null,
    val name: String? = null
)

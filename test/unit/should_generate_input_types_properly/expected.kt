package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyInputType")
data class MyInputType(
    val username: String? = null,
    @GraphQLDescription("A description for email")
    val email: String? = null,
    val name: String? = null,
    @Deprecated("Use something else instead")
    val deprecated1: String? = null,
    @Deprecated("")
    val deprecated2: String? = null,
    @Deprecated("Deprecated directive works too")
    val deprecated3: String? = null,
    @Deprecated("It only takes the first one")
    val deprecated4: String? = null
)

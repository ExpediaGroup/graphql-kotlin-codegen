package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyInputType")
data class InputTypeThatShouldBeGeneratedProperly(
    val field1: String? = null,
    @GraphQLDescription("A description for field2")
    val field2: String? = null
)

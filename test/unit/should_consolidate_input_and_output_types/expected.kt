package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

data class MyTypeToConsolidate1(
    val field: String? = null
)

@GraphQLDescription("A description for MyTypeToConsolidate2")
data class MyTypeToConsolidate2(
    val field: String? = null
)

data class MyTypeToConsolidate3(
    val field: String? = null
)

@GraphQLDescription("It always uses the type description when consolidating")
data class MyTypeToConsolidate4(
    val field: String? = null
)

data class MyTypeNotToConsolidate(
    val field: String? = null
)

data class MyTypeToNotConsolidateInput(
    val field: String? = null
)

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT, GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidate(
    val field: String? = null
)

@GraphQLDescription("A description for MyTypeToConsolidate2")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT, GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidate2(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT, GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidate3(
    val field: String? = null
)

@GraphQLDescription("It always uses the type description when consolidating")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT, GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidate4(
    val field: String? = null
)

data class MyTypeNotToConsolidate(
    val field: String? = null
)

@GraphQLDescription("The type name must exactly match in order to consolidate")
data class MyTypeToNotConsolidateInput(
    val field: String? = null
)

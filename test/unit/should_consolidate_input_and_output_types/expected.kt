package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

data class MyTypeToConsolidate(
    val field: List<String>? = null,
    val field2: NestedTypeToConsolidate? = null
)

data class NestedTypeToConsolidate(
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

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeNotToConsolidate(
    val field: String? = null
)

@GraphQLDescription("The type name must exactly match in order to consolidate")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToNotConsolidateInput(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToNotConsolidate2(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeInputToNotConsolidate2(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeWhereFieldsDoNotMatch(
    val field: String? = null,
    val field2: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeWhereFieldsDoNotMatchInput(
    val field: String? = null,
    val field2: Int? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidateParent(
    val field: MyTypeToConsolidate? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToConsolidateInputParent(
    val field: MyTypeToConsolidate? = null
)

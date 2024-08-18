package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidateWithConfig(
    val field: List<String>? = null,
    val field2: NestedTypeToConsolidateWithConfig? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToConsolidateWithConfigInput(
    val field: List<String>? = null,
    val field2: NestedTypeToConsolidateWithConfigInput? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class NestedTypeToConsolidateWithConfig(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class NestedTypeToConsolidateWithConfigInput(
    val field: String? = null
)

@GraphQLDescription("A description for MyTypeToConsolidate2")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidate2WithConfig(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToConsolidate2WithConfigInput(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidate3WithConfig(
    val field: String? = null
)

@GraphQLDescription("It ignores the description on the input when consolidating")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToConsolidate3WithConfigInput(
    val field: String? = null
)

@GraphQLDescription("It always uses the type description when consolidating")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidate4WithConfig(
    val field: String? = null
)

@GraphQLDescription("A description for MyTypeToConsolidateInput4")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToConsolidate4WithConfigInput(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeNotToConsolidateWithConfig(
    val field: String? = null
)

@GraphQLDescription("The type name must exactly match in order to consolidate")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToNotConsolidateWithConfigInput(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToNotConsolidate2WithConfig(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeInputToNotConsolidate2WithConfig(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeWhereFieldsDoNotMatchWithConfig(
    val field: String? = null,
    val field2: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeWhereFieldsDoNotMatchWithConfigInput(
    val field: String? = null,
    val field2: Int? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeToConsolidateParentWithConfig(
    val field: MyTypeToConsolidateWithConfig? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeToConsolidateInputParentWithConfig(
    val field: MyTypeToConsolidateWithConfigInput? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyTypeToConsolidateParent2WithConfig {
    open fun field(input: MyTypeToConsolidateWithConfigInput, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = throw NotImplementedError("MyTypeToConsolidateParent2WithConfig.field must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeNotToConsolidateParentWithConfig(
    val field: MyTypeNotToConsolidate2WithConfig? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeNotToConsolidateParentWithConfigInput(
    val field: MyTypeNotToConsolidate2WithConfigInput? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeNotToConsolidate2WithConfig(
    val field1: String? = null,
    val field2: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeNotToConsolidate2WithConfigInput(
    val field1: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MySuperSetTypeWithConfig(
    val field: String? = null,
    val field2: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MySuperSetTypeWithConfigInput(
    val field: String? = null,
    val field2: String? = null,
    val field3: Int? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeWithEnumsWithConfig(
    val field1: List<Enum1WithConfig>? = null,
    val field2: List<Enum2WithConfig>? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyTypeWithEnumsWithConfigInput(
    val field1: List<Enum1WithConfig>? = null,
    val field2: List<Enum2WithConfig>? = null
)

enum class Enum1WithConfig {
    This,
    That;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): Enum1WithConfig? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

enum class Enum2WithConfig {
    The_Other;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): Enum2WithConfig? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
interface TypeWithOnlyFieldArgs {
    fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    fun nonNullableResolver(arg: InputTypeForResolver, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
abstract class HybridType(
    val nullableField: String? = null,
    val nonNullableField: String
) {
    abstract fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    abstract fun nonNullableResolver(arg: InputTypeForResolver, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class InputTypeForResolver(
    val field: String? = null
)

interface HybridInterface {
    val field1: String?
    val field2: String
    fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>?
    fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String>
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
abstract class TypeImplementingInterface(
    override val field1: String? = null,
    override val field2: String,
    val booleanField1: Boolean? = null,
    val booleanField2: Boolean = false,
    val integerField1: Int? = null,
    val integerField2: Int
) : HybridInterface {
    abstract override fun nullableListResolver(arg1: Int?, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>?
    abstract override fun nonNullableListResolver(arg1: Int, arg2: Int?, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String>
}

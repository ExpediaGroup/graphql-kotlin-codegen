package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class TypeWithOnlyFieldArgs {
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = throw NotImplementedError("TypeWithOnlyFieldArgs.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: InputTypeForResolver, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("TypeWithOnlyFieldArgs.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class HybridType(
    val nullableField: String? = null,
    val nonNullableField: String,
    private val nullableResolver: String? = null,
    private val nonNullableResolver: String
) {
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = nullableResolver
    open fun nonNullableResolver(arg: InputTypeForResolver, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = nonNullableResolver
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
open class TypeImplementingInterface(
    override val field1: String? = null,
    override val field2: String,
    val booleanField1: Boolean? = null,
    val booleanField2: Boolean = false,
    val integerField1: Int? = null,
    val integerField2: Int,
    private val nullableListResolver: List<String?>? = null,
    private val nonNullableListResolver: List<String> = emptyList()
) : HybridInterface {
    override fun nullableListResolver(arg1: Int?, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>? = nullableListResolver
    override fun nonNullableListResolver(arg1: Int, arg2: Int?, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String> = nonNullableListResolver
}

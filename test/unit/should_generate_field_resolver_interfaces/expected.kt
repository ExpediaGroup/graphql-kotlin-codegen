package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class TypeWithOnlyFieldArgs {
    open fun nullableResolver(arg: String): String? = throw NotImplementedError("Query.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: InputTypeForResolver): String = throw NotImplementedError("Query.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class HybridType(
    val nullableField: String? = null,
    val nonNullableField: String
) {
    open fun nullableResolver(arg: String): String? = throw NotImplementedError("Query.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: InputTypeForResolver): String = throw NotImplementedError("Query.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class InputTypeForResolver(
    val field: String? = null
)

interface HybridInterface {
    val field1: String?
    val field2: String
    fun nullableListResolver(arg1: Int?, arg2: Int): List<String?>?
    fun nonNullableListResolver(arg1: Int, arg2: Int?): List<String>
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class TypeImplementingInterface(
    override val field1: String? = null,
    override val field2: String,
    val booleanField1: Boolean? = null,
    val booleanField2: Boolean,
    val integerField1: Int? = null,
    val integerField2: Int
) : HybridInterface {
    override fun nullableListResolver(arg1: Int?, arg2: Int): List<String?>? = throw NotImplementedError("FieldType.nullableListResolver must be implemented.")
    override fun nonNullableListResolver(arg1: Int, arg2: Int?): List<String> = throw NotImplementedError("FieldType.nonNullableListResolver must be implemented.")
}

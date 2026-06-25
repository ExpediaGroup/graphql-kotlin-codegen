package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MySuspendFieldsType(
    val normalField: String,
    val nullableNormalField: String? = null
) {
    open suspend fun suspendField(input: String? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MySuspendFieldsType.suspendField must be implemented.")
    open suspend fun nullableSuspendField(input: String? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
}

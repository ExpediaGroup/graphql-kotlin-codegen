package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MySuspendFieldsType {
    open suspend fun suspendField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    open fun normalField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MySuspendFieldsType.normalField must be implemented.")
}

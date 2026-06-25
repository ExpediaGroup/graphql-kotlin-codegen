package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyCompletableFutureFieldsType(
    val normalField: String,
    val normalNullableField: String? = null
) {
    open fun completableFutureField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureFieldsType.completableFutureField must be implemented.")
    open fun nullableCompletableFutureField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?> = java.util.concurrent.CompletableFuture.completedFuture(null)
}

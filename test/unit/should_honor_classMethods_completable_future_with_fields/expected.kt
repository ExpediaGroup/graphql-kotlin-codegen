package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyCompletableFutureFieldsType {
    open fun completableFutureField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?> = java.util.concurrent.CompletableFuture.completedFuture(null)
    open fun normalField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureFieldsType.normalField must be implemented.")
}

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class DataFetcherResultCompletableFutureType {
    open fun stringField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<String?>> = java.util.concurrent.CompletableFuture.completedFuture(graphql.execution.DataFetcherResult.newResult<String?>().data(null).build())
    open fun stringField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<String>> = throw NotImplementedError("DataFetcherResultCompletableFutureType.stringField2 must be implemented.")
    open fun booleanField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<Boolean?>> = java.util.concurrent.CompletableFuture.completedFuture(graphql.execution.DataFetcherResult.newResult<Boolean?>().data(null).build())
    open fun booleanField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<Boolean>> = throw NotImplementedError("DataFetcherResultCompletableFutureType.booleanField2 must be implemented.")
    open fun integerField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<Int?>> = java.util.concurrent.CompletableFuture.completedFuture(graphql.execution.DataFetcherResult.newResult<Int?>().data(null).build())
    open fun integerField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<Int>> = throw NotImplementedError("DataFetcherResultCompletableFutureType.integerField2 must be implemented.")
    open fun listField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<List<String>>> = throw NotImplementedError("DataFetcherResultCompletableFutureType.listField must be implemented.")
    open fun listField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<List<String?>>> = throw NotImplementedError("DataFetcherResultCompletableFutureType.listField2 must be implemented.")
    open fun listField3(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<List<String>?>> = java.util.concurrent.CompletableFuture.completedFuture(graphql.execution.DataFetcherResult.newResult<List<String>?>().data(null).build())
    open fun listField4(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<graphql.execution.DataFetcherResult<List<String?>?>> = java.util.concurrent.CompletableFuture.completedFuture(graphql.execution.DataFetcherResult.newResult<List<String?>?>().data(null).build())
}

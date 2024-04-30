package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyResolverType {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = throw NotImplementedError("MyResolverType.nullableField must be implemented.")
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MyResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = throw NotImplementedError("MyResolverType.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MyResolverType.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MySuspendResolverType {
    open suspend fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = throw NotImplementedError("MySuspendResolverType.nullableField must be implemented.")
    open suspend fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MySuspendResolverType.nonNullableField must be implemented.")
    open suspend fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = throw NotImplementedError("MySuspendResolverType.nullableResolver must be implemented.")
    open suspend fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MySuspendResolverType.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyCompletableFutureResolverType {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?> = throw NotImplementedError("MyCompletableFutureResolverType.nullableField must be implemented.")
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?> = throw NotImplementedError("MyCompletableFutureResolverType.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyExcludedResolverType(
    val nullableField: String? = null,
    val nonNullableField: String
)

interface MyIncludedInterface {
    suspend fun field(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
}

interface MyExcludedInterface {
    val field: String?
}

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyIncludedResolverType {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): MyChildType? = throw NotImplementedError("MyIncludedResolverType.nullableField must be implemented.")
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String = throw NotImplementedError("MyIncludedResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String? = throw NotImplementedError("MyIncludedResolverType.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String = throw NotImplementedError("MyIncludedResolverType.nonNullableResolver must be implemented.")
    open fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): List<String?>? = throw NotImplementedError("MyIncludedResolverType.nullableListResolver must be implemented.")
    open fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): List<String> = throw NotImplementedError("MyIncludedResolverType.nonNullableListResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyChildType(
    val field: String? = null,
    private val field2: String? = null
) {
    open fun field2(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String? = field2
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyIncludedResolverTypeWithNoFieldArgs {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String? = throw NotImplementedError("MyIncludedResolverTypeWithNoFieldArgs.nullableField must be implemented.")
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String = throw NotImplementedError("MyIncludedResolverTypeWithNoFieldArgs.nonNullableField must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MySuspendResolverType {
    open suspend fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String? = throw NotImplementedError("MySuspendResolverType.nullableField must be implemented.")
    open suspend fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String = throw NotImplementedError("MySuspendResolverType.nonNullableField must be implemented.")
    open suspend fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String? = throw NotImplementedError("MySuspendResolverType.nullableResolver must be implemented.")
    open suspend fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String = throw NotImplementedError("MySuspendResolverType.nonNullableResolver must be implemented.")
    open suspend fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): List<String?>? = throw NotImplementedError("MySuspendResolverType.nullableListResolver must be implemented.")
    open suspend fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): List<String> = throw NotImplementedError("MySuspendResolverType.nonNullableListResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyCompletableFutureResolverType {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): java.util.concurrent.CompletableFuture<String?> = throw NotImplementedError("MyCompletableFutureResolverType.nullableField must be implemented.")
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): java.util.concurrent.CompletableFuture<String?> = throw NotImplementedError("MyCompletableFutureResolverType.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableResolver must be implemented.")
    open fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): java.util.concurrent.CompletableFuture<List<String?>?> = throw NotImplementedError("MyCompletableFutureResolverType.nullableListResolver must be implemented.")
    open fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): java.util.concurrent.CompletableFuture<List<String>> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableListResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyExcludedResolverType(
    val nullableField: String? = null,
    val nonNullableField: String
)

interface MyIncludedInterface {
    fun field(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String?
}

interface MyIncludedInterfaceSuspend {
    suspend fun field(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String?
}

interface MyExcludedInterface {
    val field: String?
}

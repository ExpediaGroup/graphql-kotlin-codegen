package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyIncludedResolverType {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): MyChildType? = null
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MyIncludedResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    open fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MyIncludedResolverType.nonNullableResolver must be implemented.")
    open fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>? = null
    open fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String> = throw NotImplementedError("MyIncludedResolverType.nonNullableListResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyChildType(
    val field: String? = null,
    private val field2: String? = null
) {
    open fun field2(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = field2
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyIncludedResolverTypeWithNoFieldArgs {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MyIncludedResolverTypeWithNoFieldArgs.nonNullableField must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MySuspendResolverType {
    open suspend fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    open suspend fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MySuspendResolverType.nonNullableField must be implemented.")
    open suspend fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    open suspend fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("MySuspendResolverType.nonNullableResolver must be implemented.")
    open suspend fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>? = null
    open suspend fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String> = throw NotImplementedError("MySuspendResolverType.nonNullableListResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyCompletableFutureResolverType {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?> = null
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?> = null
    open fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableResolver must be implemented.")
    open fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<List<String?>?> = null
    open fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<List<String>> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableListResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyExcludedResolverType(
    val nullableField: String? = null,
    val nonNullableField: String
)

interface MyIncludedInterface {
    fun field(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
}

interface MyIncludedInterfaceSuspend {
    suspend fun field(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
}

interface MyExcludedInterface {
    val field: String?
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyIncludedResolverTypeWithNullDataFetchingEnvironment {
    open fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String? = null
    open fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment? = null): String = throw NotImplementedError("MyIncludedResolverTypeWithNullDataFetchingEnvironment.nonNullableField must be implemented.")
}

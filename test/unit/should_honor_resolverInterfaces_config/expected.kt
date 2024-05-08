package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
interface MyIncludedResolverType {
    fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
    fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
    fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>?
    fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String>
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
interface MyIncludedResolverTypeWithNoFieldArgs {
    fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
interface MySuspendResolverType {
    suspend fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    suspend fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
    suspend fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    suspend fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
    suspend fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>?
    suspend fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String>
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
interface MyCompletableFutureResolverType {
    fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
    fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
    fun nullableListResolver(arg1: Int? = null, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<List<String?>?>
    fun nonNullableListResolver(arg1: Int, arg2: Int? = null, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<List<String>>
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

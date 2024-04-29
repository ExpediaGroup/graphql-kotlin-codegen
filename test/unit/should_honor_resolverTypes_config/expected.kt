package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLIgnore
interface MyResolverType {
    suspend fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    suspend fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
    suspend fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    suspend fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
}

@GraphQLIgnore
interface MyResolverTypeCompletableFuture {
    fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
    fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
}

@GraphQLIgnore
interface MyIncludedResolverType {
    suspend fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    suspend fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
}

@GraphQLIgnore
interface MyIncludedResolverTypeCompletableFuture {
    fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
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

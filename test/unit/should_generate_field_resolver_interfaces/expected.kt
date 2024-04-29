package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLIgnore
interface Query {
    suspend fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): FieldType? = null
    suspend fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): FieldType
    suspend fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    suspend fun nonNullableResolver(arg: InputTypeGenerateFieldResolverInterfaces, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
}

@GraphQLIgnore
interface QueryCompletableFuture {
    fun nullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<FieldType?>
    fun nonNullableField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<FieldType>
    fun nullableResolver(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableResolver(arg: InputTypeGenerateFieldResolverInterfaces, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class InputTypeGenerateFieldResolverInterfaces(
    val field: String? = null
)

interface MyFieldInterface {
    suspend fun field1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String?
    suspend fun field2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
    suspend fun nullableListResolver(arg1: Int?, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>?
    suspend fun nonNullableListResolver(arg1: Int, arg2: Int?, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String>
}

@GraphQLIgnore
interface FieldType : MyFieldInterface {
    override suspend fun field1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    override suspend fun field2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
    suspend fun booleanField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): Boolean? = null
    suspend fun booleanField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): Boolean = false
    suspend fun integerField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): Int? = null
    suspend fun integerField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): Int
    override suspend fun nullableListResolver(arg1: Int?, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String?>? = null
    override suspend fun nonNullableListResolver(arg1: Int, arg2: Int?, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): List<String> = emptyList()
}

@GraphQLIgnore
interface FieldTypeCompletableFuture {
    fun field1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun field2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
    fun booleanField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<Boolean?>
    fun booleanField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<Boolean>
    fun integerField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<Int?>
    fun integerField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<Int>
    fun nullableListResolver(arg1: Int?, arg2: Int, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<List<String?>?>
    fun nonNullableListResolver(arg1: Int, arg2: Int?, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<List<String>>
}

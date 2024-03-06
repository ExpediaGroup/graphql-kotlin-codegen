package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLIgnore
interface MyExtraFieldArgsType {
    suspend fun myField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    suspend fun fieldWithArgs(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String
}

@GraphQLIgnore
interface MyExtraFieldArgsTypeCompletableFuture {
    fun myField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun fieldWithArgs(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String>
}

@GraphQLIgnore
interface MyIncludedExtraFieldArgsType {
    suspend fun myField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
    suspend fun myOtherField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String? = null
}

@GraphQLIgnore
interface MyIncludedExtraFieldArgsTypeCompletableFuture {
    fun myField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
    fun myOtherField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): java.util.concurrent.CompletableFuture<String?>
}

@GraphQLIgnore
interface MyOtherType {
    suspend fun myField(arg: String): String
    suspend fun myOtherField(): String? = null
}

@GraphQLIgnore
interface MyOtherTypeCompletableFuture {
    fun myField(arg: String): java.util.concurrent.CompletableFuture<String>
    fun myOtherField(): java.util.concurrent.CompletableFuture<String?>
}

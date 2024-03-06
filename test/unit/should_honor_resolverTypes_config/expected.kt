package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLIgnore
interface MyResolverType {
    suspend fun nullableField(): String? = null
    suspend fun nonNullableField(): String
    suspend fun nullableResolver(arg: String): String? = null
    suspend fun nonNullableResolver(arg: String): String
}

@GraphQLIgnore
interface MyResolverTypeCompletableFuture {
    fun nullableField(): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableField(): java.util.concurrent.CompletableFuture<String>
    fun nullableResolver(arg: String): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableResolver(arg: String): java.util.concurrent.CompletableFuture<String>
}

@GraphQLIgnore
interface MyIncludedResolverType {
    suspend fun nullableField(): String? = null
    suspend fun nonNullableField(): String
}

@GraphQLIgnore
interface MyIncludedResolverTypeCompletableFuture {
    fun nullableField(): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableField(): java.util.concurrent.CompletableFuture<String>
}

data class MyExcludedResolverType(
    val nullableField: String? = null,
    val nonNullableField: String
)

interface MyIncludedInterface {
    suspend fun field(): String?
}

interface MyExcludedInterface {
    val field: String?
}

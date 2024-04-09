package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLIgnore
interface Query {
    suspend fun nullableField(): FieldType? = null
    suspend fun nonNullableField(): FieldType
    suspend fun nullableResolver(arg: String): String? = null
    suspend fun nonNullableResolver(arg: InputTypeGenerateFieldResolverInterfaces): String
}

@GraphQLIgnore
interface QueryCompletableFuture {
    fun nullableField(): java.util.concurrent.CompletableFuture<FieldType?>
    fun nonNullableField(): java.util.concurrent.CompletableFuture<FieldType>
    fun nullableResolver(arg: String): java.util.concurrent.CompletableFuture<String?>
    fun nonNullableResolver(arg: InputTypeGenerateFieldResolverInterfaces): java.util.concurrent.CompletableFuture<String>
}

data class InputTypeGenerateFieldResolverInterfaces(
    val field: String? = null
)

interface MyFieldInterface {
    suspend fun field1(): String?
    suspend fun field2(): String
    suspend fun nullableListResolver(arg1: Int?, arg2: Int): List<String?>?
    suspend fun nonNullableListResolver(arg1: Int, arg2: Int?): List<String>
}

@GraphQLIgnore
interface FieldType : MyFieldInterface {
    override suspend fun field1(): String? = null
    override suspend fun field2(): String
    suspend fun booleanField1(): Boolean? = null
    suspend fun booleanField2(): Boolean = false
    suspend fun integerField1(): Int? = null
    suspend fun integerField2(): Int
    override suspend fun nullableListResolver(arg1: Int?, arg2: Int): List<String?>? = null
    override suspend fun nonNullableListResolver(arg1: Int, arg2: Int?): List<String> = emptyList()
}

@GraphQLIgnore
interface FieldTypeCompletableFuture {
    fun field1(): java.util.concurrent.CompletableFuture<String?>
    fun field2(): java.util.concurrent.CompletableFuture<String>
    fun booleanField1(): java.util.concurrent.CompletableFuture<Boolean?>
    fun booleanField2(): java.util.concurrent.CompletableFuture<Boolean>
    fun integerField1(): java.util.concurrent.CompletableFuture<Int?>
    fun integerField2(): java.util.concurrent.CompletableFuture<Int>
    fun nullableListResolver(arg1: Int?, arg2: Int): java.util.concurrent.CompletableFuture<List<String?>?>
    fun nonNullableListResolver(arg1: Int, arg2: Int?): java.util.concurrent.CompletableFuture<List<String>>
}

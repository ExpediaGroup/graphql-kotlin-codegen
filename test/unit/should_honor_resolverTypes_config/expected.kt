package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyResolverType {
    open fun nullableField(): String? = throw NotImplementedError("MyResolverType.nullableField must be implemented.")
    open fun nonNullableField(): String = throw NotImplementedError("MyResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String): String? = throw NotImplementedError("MyResolverType.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: InputTypeForResolver): String = throw NotImplementedError("MyResolverType.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MySuspendResolverType {
    open suspend fun nullableField(): String? = throw NotImplementedError("MySuspendResolverType.nullableField must be implemented.")
    open suspend fun nonNullableField(): String = throw NotImplementedError("MySuspendResolverType.nonNullableField must be implemented.")
    open suspend fun nullableResolver(arg: String): String? = throw NotImplementedError("MySuspendResolverType.nullableResolver must be implemented.")
    open suspend fun nonNullableResolver(arg: InputTypeForResolver): String = throw NotImplementedError("MySuspendResolverType.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MyCompletableFutureResolverType {
    open fun nullableField(): java.util.concurrent.CompletableFuture<String?> = throw NotImplementedError("MyCompletableFutureResolverType.nullableField must be implemented.")
    open fun nonNullableField(): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableField must be implemented.")
    open fun nullableResolver(arg: String): java.util.concurrent.CompletableFuture<String?> = throw NotImplementedError("MyCompletableFutureResolverType.nullableResolver must be implemented.")
    open fun nonNullableResolver(arg: String): java.util.concurrent.CompletableFuture<String> = throw NotImplementedError("MyCompletableFutureResolverType.nonNullableResolver must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
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

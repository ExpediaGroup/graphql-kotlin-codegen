package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@com.expediagroup.graphql.generator.federation.directives.ExtendsDirective
@com.expediagroup.graphql.generator.federation.directives.KeyDirective(com.expediagroup.graphql.generator.federation.directives.FieldSet("some field"))
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class FederatedType(
    @com.expediagroup.graphql.generator.federation.directives.ExternalDirective
    val field: String
)

@com.expediagroup.graphql.generator.federation.directives.ExtendsDirective
@com.expediagroup.graphql.generator.federation.directives.KeyDirective(com.expediagroup.graphql.generator.federation.directives.FieldSet("some other field"))
@GraphQLIgnore
interface FederatedTypeResolver {
    suspend fun field(arg: String): String
    @com.expediagroup.graphql.generator.federation.directives.ExternalDirective
    val field2: String?
}

@com.expediagroup.graphql.generator.federation.directives.ExtendsDirective
@com.expediagroup.graphql.generator.federation.directives.KeyDirective(com.expediagroup.graphql.generator.federation.directives.FieldSet("some other field"))
@GraphQLIgnore
interface FederatedTypeResolverCompletableFuture {
    fun field(arg: String): java.util.concurrent.CompletableFuture<String>
    @com.expediagroup.graphql.generator.federation.directives.ExternalDirective
    val field2: java.util.concurrent.CompletableFuture<String?>
}

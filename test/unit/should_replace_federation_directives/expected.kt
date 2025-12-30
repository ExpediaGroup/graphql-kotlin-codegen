package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@com.expediagroup.graphql.generator.federation.directives.ExtendsDirective
@com.expediagroup.graphql.generator.federation.directives.KeyDirective(com.expediagroup.graphql.generator.federation.directives.FieldSet("some field"))
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class FederatedType(
    @param:com.expediagroup.graphql.generator.federation.directives.ExternalDirective
    val field: String
)

@com.expediagroup.graphql.generator.federation.directives.ExtendsDirective
@com.expediagroup.graphql.generator.federation.directives.KeyDirective(com.expediagroup.graphql.generator.federation.directives.FieldSet("some other field"))
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class FederatedTypeResolver(
    private val field: String,
    @param:com.expediagroup.graphql.generator.federation.directives.ExternalDirective
    val field2: String? = null
) {
    open fun field(arg: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = field
}

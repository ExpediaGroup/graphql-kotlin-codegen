package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_directiveReplacements_config.*

@GraphQLDirective(
    name = "MyCustomDirective",
    description = "A description for MyCustomDirective",
    locations = [graphql.introspection.Introspection.DirectiveLocation.OBJECT, graphql.introspection.Introspection.DirectiveLocation.FIELD_DEFINITION, graphql.introspection.Introspection.DirectiveLocation.INPUT_OBJECT, graphql.introspection.Introspection.DirectiveLocation.INPUT_FIELD_DEFINITION]
)
annotation class MyCustomDirective

@GraphQLDirective(
    name = "MyCustomDirective2",
    description = "",
    locations = [graphql.introspection.Introspection.DirectiveLocation.OBJECT, graphql.introspection.Introspection.DirectiveLocation.FIELD_DEFINITION, graphql.introspection.Introspection.DirectiveLocation.INPUT_OBJECT, graphql.introspection.Introspection.DirectiveLocation.INPUT_FIELD_DEFINITION]
)
annotation class MyCustomDirective2

@MyCustomDirective
@MyCustomDirective2
@SomeAnnotation1
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeWithCustomDirectiveOnObject(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyTypeWithCustomDirectiveOnField(
    @MyCustomDirective
    val field: String? = null
)

@MyCustomDirective
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyInputWithCustomDirectiveOnObject(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyInputWithCustomDirectiveOnField(
    @MyCustomDirective
    val field: String? = null
)

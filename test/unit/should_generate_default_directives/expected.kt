package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDirective(
    name = "MyCustomDirective",
    description = "A description for MyCustomDirective",
    locations = [graphql.introspection.Introspection.DirectiveLocation.FIELD_DEFINITION]
)
annotation class MyCustomDirective

@MyCustomDirective
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

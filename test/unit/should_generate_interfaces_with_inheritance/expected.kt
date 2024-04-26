package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for InterfaceWithInheritance")
interface InterfaceWithInheritance {
    val field: String?
    val field2: String
}

@GraphQLDescription("A description for MyInterfaceImplementation")
@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyInterfaceImplementation(
    override val field: String? = null,
    override val field2: String
) : InterfaceWithInheritance

interface InheritedInterface1 {
    val field: String?
}

interface InheritedInterface2 {
    val field2: String
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyMergedInterfaceImplementation(
    override val field: String? = null,
    override val field2: String
) : InheritedInterface1, InheritedInterface2

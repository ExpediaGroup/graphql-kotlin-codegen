package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyType(
    val typeField: MyNestedType,
    val typeListField: List<ListType> = emptyList(),
    val enumField: MyEnum,
    val unionField: MyUnion,
    val unionImplementationField: UnionImplementation,
    val interfaceField: MyInterface1,
    val interfaceImplementationField: MyImplementedInterface
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyNestedType(
    val field: String? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class ListType(
    val field: List<NestedListType>? = null
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class NestedListType(
    val field: String? = null
)

enum class MyEnum {
    This,
    That;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): MyEnum? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

interface MyUnion

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyType1(
    val field: String? = null
) : MyUnion

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyType2(
    val field: String? = null
) : MyUnion

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class UnionImplementation(
    val field: String? = null
) : MyUnion2

interface MyInterface1 {
    val field: String?
}

interface MyInterfaceToImplement {
    val field: String?
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class MyImplementedInterface(
    override val field: String? = null
) : MyInterfaceToImplement

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyInput(
    val field: MyNestedInput
)

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.INPUT_OBJECT])
data class MyNestedInput(
    val field: String? = null
)

interface MyStandaloneUnion

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class StandaloneUnionType(
    val field: StandaloneNestedType? = null
) : MyStandaloneUnion

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class StandaloneNestedType(
    val field: String? = null
)

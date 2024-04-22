package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

data class MyType(
    val typeField: MyNestedType,
    val typeListField: List<ListType> = emptyList(),
    val enumField: MyEnum,
    val unionField: MyUnion,
    val unionImplementationField: UnionImplementation,
    val interfaceField: MyInterface1,
    val interfaceImplementationField: MyImplementedInterface
)

data class MyNestedType(
    val field: String? = null
)

data class ListType(
    val field: List<NestedListType>? = null
)

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

data class MyType1(
    val field: String? = null
) : MyUnion

data class MyType2(
    val field: String? = null
) : MyUnion

data class UnionImplementation(
    val field: String? = null
) : MyUnion2

interface MyInterface1 {
    val field: String?
}

interface MyInterfaceToImplement {
    val field: String?
}

data class MyImplementedInterface(
    override val field: String? = null
) : MyInterfaceToImplement

data class MyInput(
    val field: MyNestedInput
)

data class MyNestedInput(
    val field: String? = null
)

interface MyStandaloneUnion

data class StandaloneUnionType(
    val field: StandaloneNestedType? = null
) : MyStandaloneUnion

data class StandaloneNestedType(
    val field: String? = null
)

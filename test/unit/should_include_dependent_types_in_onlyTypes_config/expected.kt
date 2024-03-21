package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

data class MyType(
    val typeField: MyNestedType,
    val typeListField: List<ListType> = emptyList(),
    val enumField: MyEnum,
    @MyUnion
    val unionField: Any,
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

enum class MyEnum(val value: String) {
    This("THIS"),
    That("THAT");

    companion object {
        fun findByName(name: String): MyEnum? = values().find { it.name == name }
        fun findByValue(value: String): MyEnum? = values().find { it.value == value }
    }
}

@GraphQLUnion(
    name = "MyUnion",
    possibleTypes = [MyType1::class, MyType2::class],
    description = ""
)
annotation class MyUnion

data class MyType1(
    val field: String? = null
)

data class MyType2(
    val field: String? = null
)

data class UnionImplementation(
    val field: String? = null
)

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

@GraphQLUnion(
    name = "MyStandaloneUnion",
    possibleTypes = [StandaloneUnionType::class],
    description = ""
)
annotation class MyStandaloneUnion

data class StandaloneUnionType(
    val field: StandaloneNestedType? = null
)

data class StandaloneNestedType(
    val field: String? = null
)

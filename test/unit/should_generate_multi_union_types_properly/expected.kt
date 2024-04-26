package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

data class MyType3(
    val field: String? = null
) : MyUnion1, MyUnion2

data class MyType4(
    val field: String? = null
) : MyUnion1, MyUnion2

interface MyUnion1

interface MyUnion2

data class MyMultiUnionType(
    val field: MyUnion1? = null,
    val field2: MyUnion2? = null
)

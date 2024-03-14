package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import com.some.import.TypeOutOfScope
import com.some.import.UnionOutOfScope
import com.some.import.ExternalUnionAsInterface

data class MyTypeInOnlyTypes(
    val field: TypeInScope,
    val field2: TypeOutOfScope
)

data class TypeInScope(
    val field: String? = null,
    @UnionInScope
    val unionInScopeField: Any? = null,
    @UnionOutOfScope
    val unionOutOfScopeField: Any? = null,
    val externalUnionAsInterfaceField: ExternalUnionAsInterface? = null
)

@GraphQLUnion(
    name = "UnionInScope",
    possibleTypes = [Type1::class],
    description = ""
)
annotation class UnionInScope

data class Type1(
    val field: String? = null
)

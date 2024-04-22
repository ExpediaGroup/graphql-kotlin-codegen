package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*
import should_honor_dependentTypesInScope_config.*

data class MyTypeInOnlyTypes(
    val field: TypeInScope,
    val field2: TypeOutOfScope
)

data class TypeInScope(
    val field: String? = null,
    val unionInScopeField: UnionInScope? = null,
    val unionOutOfScopeField: UnionOutOfScope? = null,
    val externalUnionAsInterfaceField: ExternalUnionAsInterface? = null
)

interface UnionInScope

data class Type1(
    val field: String? = null
) : UnionInScope, ExternalUnionAsInterface

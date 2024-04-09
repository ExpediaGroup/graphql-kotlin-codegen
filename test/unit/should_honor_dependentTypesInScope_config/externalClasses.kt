package should_honor_dependentTypesInScope_config

data class TypeOutOfScope(val value: String)

interface ExternalUnionAsInterface

annotation class UnionOutOfScope

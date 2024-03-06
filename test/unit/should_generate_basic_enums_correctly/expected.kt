package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

enum class UserRole(val label: String) {
    Admin("ADMIN"),
    User("USER"),
    Editor("EDITOR");

    companion object {
        @JvmStatic
        fun valueOfLabel(label: String): UserRole? {
            return values().find { it.label == label }
        }
    }
}

package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

enum class UserRole {
    Admin,
    User,
    Editor;

    companion object {
        fun findByName(name: String, ignoreCase: Boolean = false): UserRole? = values().find { it.name.equals(name, ignoreCase = ignoreCase) }
    }
}

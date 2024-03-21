package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

enum class UserRole(val value: String) {
    Admin("ADMIN"),
    User("USER"),
    Editor("EDITOR");

    companion object {
        fun findByName(name: String): UserRole? = values().find { it.name == name }
        fun findByValue(value: String): UserRole? = values().find { it.value == value }
    }
}

import com.expediagroup.graphql.plugin.gradle.graphql

repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "1.9.24"
    id("com.expediagroup.graphql") version "7.1.1"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "7.1.1")
    implementation("com.expediagroup", "graphql-kotlin-server", "7.1.1")
    implementation("com.expediagroup", "graphql-kotlin-federation", "7.1.1")
}

sourceSets {
    main {
        kotlin {
            srcDirs("test/unit")
            exclude("**/actual.kt")
            srcDirs("test/integration")
        }
    }
}

graphql {
    schema {
        packages = listOf("test.integration")
    }
}

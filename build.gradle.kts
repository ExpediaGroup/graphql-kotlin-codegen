import com.expediagroup.graphql.plugin.gradle.graphql

repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "2.2.21"
    id("com.expediagroup.graphql") version "8.8.1"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "8.8.1")
    implementation("com.expediagroup", "graphql-kotlin-server", "8.8.1")
    implementation("com.expediagroup", "graphql-kotlin-federation", "8.8.1")
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

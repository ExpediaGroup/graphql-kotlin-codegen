import com.expediagroup.graphql.plugin.gradle.graphql

repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "2.1.20"
    id("com.expediagroup.graphql") version "8.4.0"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "8.4.0")
    implementation("com.expediagroup", "graphql-kotlin-server", "8.4.0")
    implementation("com.expediagroup", "graphql-kotlin-federation", "8.4.0")
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

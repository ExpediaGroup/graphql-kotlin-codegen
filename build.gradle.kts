import com.expediagroup.graphql.plugin.gradle.graphql

repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "2.0.0"
    id("com.expediagroup.graphql") version "7.1.4"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "7.1.4")
    implementation("com.expediagroup", "graphql-kotlin-server", "7.1.4")
    implementation("com.expediagroup", "graphql-kotlin-federation", "7.1.4")
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

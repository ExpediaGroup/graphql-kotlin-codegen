import com.expediagroup.graphql.plugin.gradle.graphql

repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "2.4.20"
    id("com.expediagroup.graphql") version "11.0.0"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "11.0.0")
    implementation("com.expediagroup", "graphql-kotlin-server", "11.0.0")
    implementation("com.expediagroup", "graphql-kotlin-federation", "11.0.0")
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

import com.expediagroup.graphql.plugin.gradle.graphql

repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "2.4.0"
    id("com.expediagroup.graphql") version "10.1.2"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "10.1.2")
    implementation("com.expediagroup", "graphql-kotlin-server", "10.1.2")
    implementation("com.expediagroup", "graphql-kotlin-federation", "10.1.2")
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

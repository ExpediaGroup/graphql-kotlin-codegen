repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "1.9.23"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "7.1.0")
    implementation("com.expediagroup", "graphql-kotlin-federation", "7.1.0")
}

sourceSets {
    test {
        kotlin {
            srcDirs("test/unit", "test/integration")
            exclude("**/actual.kt")
        }
    }
}

repositories {
    mavenCentral()
}

plugins {
    kotlin("jvm") version "1.9.23"
}

dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", "7.0.2")
    implementation("com.expediagroup", "graphql-kotlin-federation", "7.0.2")
}

sourceSets {
    main {
        kotlin {
            srcDirs("test/integration")
        }
    }
}

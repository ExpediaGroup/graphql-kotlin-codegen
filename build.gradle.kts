plugins {
    kotlin("jvm") version "1.9.22"
}

val graphqlKotlinVersion = "7.0.2"
dependencies {
    implementation("com.expediagroup", "graphql-kotlin-schema-generator", graphqlKotlinVersion)
    implementation("com.expediagroup", "graphql-kotlin-federation", graphqlKotlinVersion)
}

sourceSets {
    main {
        kotlin {
            srcDirs("test/integration")
        }
    }
}

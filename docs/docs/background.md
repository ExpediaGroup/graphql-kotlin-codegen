---
sidebar_position: 1
---

# Background

## Schema-first vs code-first

[GraphQL Kotlin](https://opensource.expediagroup.com/graphql-kotlin/docs/) libraries make "code-first" implementation easy.
A Kotlin service defines its resolver classes, and graphql-kotlin outputs the corresponding Schema Definition Language (SDL) to publish.

Consequently, the schema change process becomes suboptimal. Frontend developers don't typically know Kotlin well and as a result
are less likely to participate in schema design reviews and discussions. As consumers of the schema, frontend developers _should_
be a part of schema design!

## Switching to schema-first

If a team using GraphQL Kotlin wants to use a schema-first approach, they might maintain a separate SDL file and review schema changes there.
However, this creates two problems:

1. Since the SDL file is not the source of truth, it's easy for it to become out of sync with the real schema.
   This creates confusion and causes schema reviews to take longer!
2. When a schema change is made, the change must be done twice (and reviewed twice), once in SDL and once in Kotlin.
   The manual translation of SDL to Kotlin is redundant and error-prone.

## Solution

GraphQL Kotlin Codegen translates SDL into "GraphQL Kotlin-friendly" classes which a Kotlin service can directly import
or inherit from. In doing so, both of the above problems are solved. The SDL file becomes the source of truth,
and the schema change process becomes more efficient.

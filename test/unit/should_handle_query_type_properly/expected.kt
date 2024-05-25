package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class Query {
    open fun getStuff(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Query.getStuff must be implemented.")
    open fun getStuffWithInput(input: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Query.getStuffWithInput must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class GetStuffQuery {
    open fun getStuff(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Query.getStuff must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class GetStuffWithInputQuery {
    open fun getStuffWithInput(input: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Query.getStuffWithInput must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class Mutation {
    open suspend fun mutateStuff(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Mutation.mutateStuff must be implemented.")
    open suspend fun mutateStuffWithInput(input: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Mutation.mutateStuffWithInput must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MutateStuffMutation {
    open suspend fun mutateStuff(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Mutation.mutateStuff must be implemented.")
}

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class MutateStuffWithInputMutation {
    open suspend fun mutateStuffWithInput(input: String, dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): String = throw NotImplementedError("Mutation.mutateStuffWithInput must be implemented.")
}

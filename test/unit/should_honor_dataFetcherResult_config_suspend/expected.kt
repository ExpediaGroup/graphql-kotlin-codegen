package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
open class DataFetcherResultSuspendType {
    open suspend fun stringField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<String?> = graphql.execution.DataFetcherResult.newResult<String?>().data(null).build()
    open suspend fun stringField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<String> = throw NotImplementedError("DataFetcherResultSuspendType.stringField2 must be implemented.")
    open suspend fun booleanField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<Boolean?> = graphql.execution.DataFetcherResult.newResult<Boolean?>().data(null).build()
    open suspend fun booleanField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<Boolean> = throw NotImplementedError("DataFetcherResultSuspendType.booleanField2 must be implemented.")
    open suspend fun integerField1(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<Int?> = graphql.execution.DataFetcherResult.newResult<Int?>().data(null).build()
    open suspend fun integerField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<Int> = throw NotImplementedError("DataFetcherResultSuspendType.integerField2 must be implemented.")
    open suspend fun listField(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<List<String>> = throw NotImplementedError("DataFetcherResultSuspendType.listField must be implemented.")
    open suspend fun listField2(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<List<String?>> = throw NotImplementedError("DataFetcherResultSuspendType.listField2 must be implemented.")
    open suspend fun listField3(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<List<String>?> = graphql.execution.DataFetcherResult.newResult<List<String>?>().data(null).build()
    open suspend fun listField4(dataFetchingEnvironment: graphql.schema.DataFetchingEnvironment): graphql.execution.DataFetcherResult<List<String?>?> = graphql.execution.DataFetcherResult.newResult<List<String?>?>().data(null).build()
}

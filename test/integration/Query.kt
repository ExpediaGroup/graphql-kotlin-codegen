package test.integration

import com.expediagroup.graphql.server.operations.Query
import graphql.schema.DataFetchingEnvironment
import test.integration.Query as QueryInterface

class IntegrationTestQuery : Query, QueryInterface {
    override fun testQuery(dataFetchingEnvironment: DataFetchingEnvironment): SomeType = SomeType()
}

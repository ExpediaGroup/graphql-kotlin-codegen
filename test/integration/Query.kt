package test.integration

import com.expediagroup.graphql.server.operations.Query
import graphql.schema.DataFetchingEnvironment
import test.integration.Query as QueryInterface

class IntegrationTestQuery() : Query, QueryInterface() {
    override fun testQuery1(dataFetchingEnvironment: DataFetchingEnvironment): SomeType = SomeType()
    override fun testQuery2(dataFetchingEnvironment: DataFetchingEnvironment): SomeHybridType =
        SomeHybridType(
            someField = "test",
            someField2 = "test"
        )
}

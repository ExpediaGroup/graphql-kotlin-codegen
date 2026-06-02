package com.kotlin.generated

import com.expediagroup.graphql.generator.annotations.*

@GraphQLValidObjectLocations(locations = [GraphQLValidObjectLocations.Locations.OBJECT])
data class Payment(
    @param:GraphQLDescription("3D Secure verification status returned by the PSP.")
    val threeDsStatus: String? = null,
    @param:GraphQLDescription("(Deprecated) Use paymentVerification instead.")
    @Deprecated("(internal) replaced by paymentVerification in v3")
    val legacyVerification: String? = null,
    @param:GraphQLDescription("`booking.id` of the parent itinerary.")
    val bookingRef: String,
    @param:GraphQLDescription("42 is the answer.")
    val numericDescription: String? = null,
    @param:GraphQLDescription("@some annotation style description.")
    val annotationDescription: String? = null
)

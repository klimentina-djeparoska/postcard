import SanityClient from '@sanity/client';

const sanityClient = SanityClient({
    projectId: 'ho4lt0y9',
    dataset: 'production',
    token: 'sk6IwHte0U6fkrkIBA9qmolPx74KOvU0TTvEemweMaCgYvTRlLvBI8MgOdtmhqmpOuCq0onK4nFkudG7CE2LKyDcXmu9zKR8BLiJtvX6c7eL3Bt9R7eTJfCgAUzAouwVZ2LV4NgiPjLoV4Cc8y8nAT51VeksEbbvfNYRkx63Izr5z4aRpe6m',
    useCdn: true
});

export default sanityClient;


const faker = require('faker');

const getLEIevidenceDocument = () => {
  const pastDate = (new Date(faker.date.past())).toISOString();
  const futureDate = (new Date(faker.date.future())).toISOString();

  const getStatus = () => {
    const types = ['REQUESTED', 'CONFIRMED', 'REJECTED', 'IN PROGRESS']
    return faker.random.arrayElement(types);
  }

  const getCategory = () => {
    const types = ['Grocery', 'Industrial', 'Jewelery', 'Finance']
    return faker.random.arrayElement(types);
  }

  const getLegalForm = () => {
    const types = ['CORPORATION', 'LLC']
    return faker.random.arrayElement(types);
  }

  const getCorroborationLevel = () => {
    const types = ['FULLY_CORROBORATED', 'PARTIALLY_CORROBORATED', 'NOT_CORROBORATED']
    return faker.random.arrayElement(types);
  }

  const baseUrl = 'https://api.gleif.example.org/api/v1/lei-records'
  const shortId = `${faker.random.alpha({count: 4}).toUpperCase()}`
  const lei = faker.random.alphaNumeric({count: 20}).toUpperCase()
  const id = faker.random.alphaNumeric({count: 8}).toUpperCase()
  const language = faker.random.locale()
  const otherNames = Math.random() > 0.5 ? [faker.company.companyName(), faker.company.companyName()] : []
  const companyName = faker.company.companyName()
  const country = faker.address.country()
  const region = faker.address.county()
  const addressNumber = `${faker.random.number({min: 1, max: 500})}`
  const addressNumberWithinBuilding = `${faker.random.number({min: 1, max: 10})}`

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'LEIevidenceDocument',
    "data": {
      "type": 'lei-records',
      "id": lei,
      "attributes": {
        "lei": lei,
        "entity": {
          "legalName":  {
            "name": companyName,
            "language": language
          },
          "otherNames": otherNames,
          "transliteratedOtherNames": otherNames,
          "legalAddress":  {
            "language":  language,
            "addressLines": [companyName, faker.address.streetAddress()],
            "addressNumber": addressNumber,
            "addressNumberWithinBuilding": addressNumberWithinBuilding,
            "mailRouting": `${faker.address.streetAddress()}, ${faker.address.zipCode()}`,
            "city": faker.address.city(),
            "region": region,
            "country":  country,
            "postalCode": faker.address.zipCode()
          },
          "headquartersAddress": {
            "language": language,
            "addressLines": [faker.address.streetAddress()],
            "addressNumber": addressNumber,
            "addressNumberWithinBuilding": addressNumberWithinBuilding,
            "mailRouting": `${faker.address.streetAddress()}, ${faker.address.zipCode()}`,
            "city": faker.address.city(),
            "region": faker.address.county(),
            "country":  country,
            "postalCode": faker.address.zipCode()
          },
          "registeredAt": {
            "id": id,
            "other": faker.random.alphaNumeric({count: 8}).toUpperCase()
          },
          "registeredAs": id,
          "jurisdiction":  region,
          "category": getCategory(),
          "legalForm": {
            "id": shortId,
            "other": getLegalForm()
          },
          "associatedEntity": {
            "lei": lei,
            "name": faker.company.companyName()
          },
          "status": getStatus(),
          "expiration": {
            "date": futureDate,
            "reason": faker.company.bs()
          },
          "successorEntity": {
            "lei": lei,
            "name": faker.company.companyName()
          },
          "otherAddresses": []
        },
        "registration": {
          "initialRegistrationDate": pastDate,
          "lastUpdateDate": pastDate,
          "status": getStatus(),
          "nextRenewalDate": futureDate,
          "managingLou":  faker.random.alpha({count: 20}).toUpperCase(),
          "corroborationLevel": getCorroborationLevel(),
          "validatedAt": {
            "id": id,
            "other": faker.random.alphaNumeric({count: 8}).toUpperCase()
          },
          "validatedAs": id,
          "otherValidationAuthorities": [{
            validatedAt: { id },
            validatedAs: id
          }]
        },
        "bic": [`${faker.random.alpha({count: 4}).toUpperCase()}${faker.address.countryCode()}${shortId}`]
      },
      "relationships": {
        "managing-lou": {
          "links": {
            "related": `${baseUrl}/${lei}/managing-lou`,
          }
        },
        "lei-issuer":  {
          "links": {
            "related": `${baseUrl}/${lei}/lei-issuer`,
          }
        },
        "direct-parent":  {
          "links": {
            "reporting-exception": `${baseUrl}/${lei}/direct-parent-reporting-exception`,
          }
        },
        "ultimate-parent": {
          "links": {
            "reporting-exception": `${baseUrl}/${lei}/ultimate-parent-reporting-exception`,
          }
        },
        "direct-children": {
          "links": {
            "relationship-records": `${baseUrl}/${lei}/direct-child-relationship`,
            "related": `${baseUrl}/${lei}/direct-children`,
          }
        },
        "isins": {
          "links": {
            "related": `${baseUrl}/${lei}/isins`,
          }
        },
      },
      "links": {
        "self": `${baseUrl}/${lei}`,
      }
    }
  };
  return example;
};

module.exports = { getLEIevidenceDocument };

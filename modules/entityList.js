const apiContext = require('mozu-node-sdk/clients/platform/application')()
const entityListResource = require('mozu-node-sdk/clients/platform/entityList')(apiContext);
const entityResource = require('mozu-node-sdk/clients/platform/entitylists/entity')(apiContext);

const ENTITYLISTNAME = 'appEntityList2@customApp';
const ENTITYNAME = 'appSettings';

const entityListBody = config => {
    return {
        contextLevel: "tenant",
        idProperty: {
            dataType: "string",
            propertyName: "listName"
        },
        isLocaleSpecific: false,
        isSandboxDataCloningSupported: true,
        isShopperSpecific: false,
        isVisibleInStorefront: false,
        name: ENTITYLISTNAME.split('@')[0],
        nameSpace: ENTITYLISTNAME.split('@')[1],
        tenantId: config.tenant,
        siteId: config.site,
        usages: "entityManager",
        useSystemAssignedId: false
    }
}

const entityBody = config => {
    const body = {
        listName: ENTITYNAME
    };
    Object.keys(config).forEach(key => {
        body[key] = config[key];
    });
    console.log(body);
    return body;
}


const updateEntity = config => {
    entityResource.updateEntity({
        entityListFullName: ENTITYLISTNAME,
        id: ENTITYNAME
    }, {
        body: entityBody(config)
    })
        .then(() => {
            console.log('updated');
        })
        .catch(console.log);
}

const addEntity = config => {
    entityResource.insertEntity({
        entityListFullName: ENTITYLISTNAME,
        siteId: config.site
    }, {
        body: entityBody(config)
    })
        .then(() => {
            console.log('added');
        })
        .catch(err => {
            updateEntity(config);
        });
}

const createList = config => {
    return entityListResource.createEntityList({}, {
        body: entityListBody(config)
    });
}


const getEntity = () => {
    return entityResource.getEntity({
        entityListFullName: ENTITYLISTNAME,
        id: ENTITYNAME
    });    
}

const getAndCreateOrUpdateEntity = config => {
    return getEntity()
        .then(() => {
            // entity exists, so update it
            updateEntity(config);
        })
        .catch(() => {
            // failed to get entity, probably didn't make list
            createList(config)
                .then(() => {
                    // made list, so create entity
                    addEntity(config);
                })
                .catch(() => {
                    // list probably already exists, so add entity
                    addEntity(config);
                });
        });
}

module.exports = {
    getAndCreateOrUpdateEntity,
    getEntity
}
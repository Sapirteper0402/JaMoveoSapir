export const storageService = {
    query,
    get,
    // post,
    // put,
    // remove,
}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
    const entities = await query(entityType)
    const entity = entities.find(entity_1 => entity_1.id === entityId)
    if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    return entity
}

// // Private functions
// function _save(entityType, entities) {
//     localStorage.setItem(entityType, JSON.stringify(entities))
// }

// function _makeId(length = 5) {
//     var text = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return text
// }
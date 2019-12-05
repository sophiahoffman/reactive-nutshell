const remoteURL = "http://localhost:5002";

export default {
    get(items, id) {
        return fetch(`${remoteURL}/${items}/${id}`).then(result => result.json())
    },
    getAll(items) {
        // console.log("items in fetch", items)
        return fetch(`${remoteURL}/${items}`).then(result => result.json())
    },
    delete(items, id) {
        return fetch(`${remoteURL}/${items}/${id}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    post(items, newItem) {
        return fetch(`${remoteURL}/${items}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }).then(data => data.json())
    },
    update(items, editedItem) {
        return fetch(`${remoteURL}/${items}/${editedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }).then(data => data.json());
    },
    updateSingleSection(items, editedItem) {
        return fetch(`${remoteURL}/${items}/${editedItem.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }).then(data => data.json());
    },
    // fetch to search users
    searchUser: (searchAll) => {
        return fetch(`${remoteURL}/users?&q=${searchAll}`)
            .then(users => users.json())
    },
    getWithItems(items, id, secondaryItems) {
        return fetch(`${remoteURL}/${items}/${id}?_embed=${secondaryItems}`)
          .then(result => result.json())
      }
}
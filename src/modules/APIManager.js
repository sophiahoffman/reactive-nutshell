// Author: Ken "I need more coffee" Boyd

const remoteURL = "http://localhost:5002";

export default {
  // get(route) {
  //   return fetch(`${remoteURL}/${route}`).then(result => result.json());
  // },
  async get(route) {
    const results = await fetch(`${remoteURL}/${route}`);
    return results.json();
  },
  // delete(route) {
  //   return fetch(`${remoteURL}/${route}`, {
  //     method: "DELETE"
  //   }).then(result => result.json());
  // },
  async delete(route) {
    const results = await fetch(`${remoteURL}/${route}`, {
      method: "DELETE"
    });
    return results.json();
  },
  // post(route, newItem) {
  //   return fetch(`${remoteURL}/${route}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(newItem)
  //   }).then(data => data.json());
  // },
  async post(route, newItem) {
    const results = await fetch(`${remoteURL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    });
    return results.json();
  },
  // update(route, editedItem) {
  //   return fetch(`${remoteURL}/${route}/${editedItem.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(editedItem)
  //   }).then(data => data.json());
  // }
  async update(route, editedItem) {
    const results = await fetch(`${remoteURL}/${route}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    });
    return results.json();
  }
};

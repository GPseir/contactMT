const getData = async (url) => {
    let response = await fetch(url).then((res) => res.json()).then((data) => localStorage.setItem("data", JSON.stringify(data))).catch(err => 'error')

    let seeContacts = document.getElementById('seecontacts')

    seeContacts.addEventListener('click', ($event) => {
        // console.log($event.target.id)
        let url = `./src/HTML/cmt.html`
        window.location.href = url;
    })
    return response
}
getData("./src/contacts.json")

// exports = getData


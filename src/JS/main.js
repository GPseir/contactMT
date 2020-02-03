let cmtTable = JSON.parse(localStorage.getItem("data"))

// Main Table ------------------------------------------------------
let refreshDOMTable = () => {
    let cmtTableKeys = Object.keys(cmtTable) // ['Contact1','Contact2'...]
    let cmtTableValues = Object.values(cmtTable)

    let tableContainer = document.getElementById('cmt-table-container')
    let oldTableBody = document.getElementById('tableBody')
    tableContainer.removeChild(oldTableBody)

    let newTableBody = document.createElement('span')
    newTableBody.id = 'tableBody'
    tableContainer.appendChild(newTableBody)

    // Create row divs ------------------------------------------------------
    for (let i = 0; i < cmtTableKeys.length; i++) {
        let currentRow = document.createElement('div')
        let currentNameCol = document.createElement('div')
        let currentAvatarCol = document.createElement('div')
        let currentJobCol = document.createElement('div')
        let currentFavCol = document.createElement('div')
        let currentEditBtn = document.createElement('div')
        let currentDeleteBtn = document.createElement('div')
        let currentFullDetailsBtn = document.createElement('div')

        // Assign classNames to the row divs ------------------------------------------------------
        currentRow.className = 'cmt-table-row'
        currentNameCol.className = 'cmt-table-column cmt-name'
        currentAvatarCol.className = 'cmt-table-column cmt-avatar'
        currentJobCol.className = 'cmt-table-column cmt-position'
        currentFavCol.className = 'cmt-table-column cmt-fav'
        currentEditBtn.className = 'cmt-table-column cmt-edit'
        currentDeleteBtn.className = 'cmt-table-column cmt-delete'
        currentFullDetailsBtn.className = 'cmt-table-column cmt-full'
        currentFullDetailsBtn.id = `${cmtTableKeys[i]}`

        // Build the inner HTML text, img and icons ------------------------------------------------------
        currentNameCol.innerHTML = cmtTable[cmtTableKeys[i]].name
        currentAvatarCol.innerHTML = cmtTable[cmtTableKeys[i]].avatar
        currentJobCol.innerHTML = cmtTable[cmtTableKeys[i]].jobPosition

        currentFavCol.innerHTML = cmtTable[cmtTableKeys[i]].favorite
        if (cmtTable[cmtTableKeys[i]].favorite === true) {
            currentFavCol.innerHTML = '<i class="fas fa-star"></i>'
        }
        else { currentFavCol.innerHTML = '<i class="far fa-star"></i>' }

        currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>'
        currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        currentFullDetailsBtn.innerHTML = '<i class="fas fa-address-book"></i>'

        // Append row elements to the newTableBody ------------------------------------------------------
        currentRow.appendChild(currentAvatarCol)
        currentRow.appendChild(currentNameCol)
        currentRow.appendChild(currentJobCol)
        currentRow.appendChild(currentFavCol)
        currentRow.appendChild(currentFullDetailsBtn)
        currentRow.appendChild(currentEditBtn)
        currentRow.appendChild(currentDeleteBtn)
        newTableBody.appendChild(currentRow)
    }

    // Sort Contacts 
    let sortContacts = () => {
        favTable = []
        notfavTable = []
        sortedTableValues = [...favTable, ...notfavTable]
        sortedTableKeys = []

        for (let i = 0; i < cmtTableValues.length; i++) {
            if (cmtTableValues[i].favorite === true) {
                favTable.push(cmtTableValues[i])
            } else {
                notfavTable.push(cmtTableValues[i])
            }
            sortedTableValues = [...favTable, ...notfavTable]
        }
        for (let i = 0; i < sortedTableValues.length; i++) {
            sortedTableKeys.push(`Contact${sortedTableValues[i].id}`)
        }

        let sortedTable = {}
        sortedTableKeys.forEach((key, i) => sortedTable[key] = sortedTableValues[i])

        localStorage.setItem("tableKey", JSON.stringify(sortedTable))
        location.reload();
    }

    // Enable and Disable Modals ------------------------------------------------------
    let enableDisableNewUserModal = (option) => {
        let newContactFullName = document.getElementById('newContactFullName')
        let newContactEmail = document.getElementById('newContactEmail')
        let newContactAddress = document.getElementById('newContactAddress')

        newContactFullName.value = ''
        newContactEmail.value = ''
        newContactAddress.value = ''

        let newContactModal = document.getElementById('newContactModal')
        let backdrop = document.getElementById('backdrop')

        newContactModal.className = `${option}-modal`;
        backdrop.className = `${option}-modal`
    }
    let enableDisableEditModal = (option) => {
        let backdropEditModal = document.getElementById('backdrop-edit-modal')
        let editModal = document.getElementById('edit-modal')
        editModal.className = `${option}-edit-modal`;
        backdropEditModal.className = `${option}-edit-modal`
    }
    let enableDisableDeleteConfirmModal = (option) => {
        let backdropConfModal = document.getElementById('backdrop-confirm-Modal')
        let confModal = document.getElementById('confirm-Modal')
        confModal.className = `${option}-confirm-modal`
        backdropConfModal.className = `${option}-confirm-modal`;
    }
    if (localStorage.getItem("modal") === 'enable') {
        enableDisableNewUserModal('enable')
        localStorage.setItem("modal", ('enable'))
    }

    // Target table buttons ------------------------------------------------------
    let addNewEntryBtn = document.getElementById('cmtAddNewEntry')
    let sortBtn = document.getElementById('cmtSort')
    let editBtns = document.getElementsByClassName('cmt-edit')
    let deleteBtns = document.getElementsByClassName('cmt-delete')
    let fullBtns = document.getElementsByClassName('cmt-full')

    // Target modal buttons
    let newContactSubmitBtn = document.getElementById('newContactSubmitBtn')
    let newContactCancelBtn = document.getElementById('newContactCancelBtn')
    let editSubmitBtn = document.getElementById('editSubmitBtn')
    let editCancelBtn = document.getElementById('editCancelBtn')
    let confirmDeleteBtn = document.getElementById('confirmDeleteBtn')
    let confirmCancelBtn = document.getElementById('confirmCancelBtn')

    // Submit Buttons (Modals)------------------------------------------------------
    newContactSubmitBtn.addEventListener('click', ($event) => {
        if ($event.target.innerText === 'Submit') {
            let newContactFullName = document.getElementById('newContactFullName').value.trim()
            let newContactEmail = document.getElementById('newContactEmail').value.trim()
            let newContactAddress = document.getElementById('newContactAddress').value.trim()

            // Show error if inputs are empty ------------------------------------------------------
            if (newContactFullName === '') {
                document.getElementById('newContactFullName').className = 'input-err'
            } else {
                newContactFullName.className = '';
            }

            if (newContactEmail === '') {
                document.getElementById('newContactEmail').className = 'input-err'
            } else {
                newContactEmail.className = '';
                newContactAddress.className = '';
            }

            // Create new contact (Table)------------------------------------------------------
            if (newContactFullName !== '' && newContactEmail !== '') {

                newcmtKeys = [...cmtTableKeys, `Contact${cmtTableKeys.length + 1}`]


                newcmtValues = [...cmtTableValues, {
                    "id": `${cmtTableKeys.length + 1}`,
                    "name": `${newContactFullName}`,
                    "fullName": `${newContactFullName}`,
                    "avatar": "-",
                    "jobPosition": "-",
                    "email": `${newContactEmail}`,
                    "address": `${newContactAddress}` !== '' ? `${newContactAddress}` : '-',
                    "favorite": false
                }]

                let newcmtTable = {}
                newcmtKeys.forEach((key, i) => newcmtTable[key] = newcmtValues[i])

                localStorage.setItem("tableKey", JSON.stringify(newcmtTable))
                enableDisableNewUserModal('disable')
                localStorage.setItem("modal", ('disable'))
                location.reload()
                refreshDOMTable()
            }
        }
    })

    // Cancel Buttons (Modals) ------------------------------------------------------
    newContactCancelBtn.addEventListener('click', () => {
        localStorage.setItem("modal", ('disable'))
        document.getElementById('newContactFullName').className = ''
        document.getElementById('newContactEmail').className = ''
        enableDisableNewUserModal('disable')
    })
    editCancelBtn.addEventListener('click', () => {
        localStorage.setItem("modal", ('disable'))
        enableDisableEditModal('disable')
    })
    confirmCancelBtn.addEventListener('click', () => {
        localStorage.setItem("modal", ('disable'))
        enableDisableDeleteConfirmModal('disable')
    })

    // ****************** Functionality of table buttons ******************
    // Sort Contact Button (Table) ------------------------------------------------------
    sortBtn.addEventListener('click', () => {
        sortContacts()
    })

    // Add Contact Button (Table) ------------------------------------------------------
    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable')
    })

    // Functionality of full details buttons (Table)------------------------------------------------------
    for (let i = 0; i < fullBtns.length; i++) {
        fullBtns[i].addEventListener('click', ($event) => {
            // console.log($event.target.id)
            localStorage.setItem("tableKey", JSON.stringify(cmtTable))
            localStorage.setItem("contactKey", ($event.target.id))
            let url = `details.html`
            window.location.href = url;
        })
    }

    // Functionality of edit buttons (Table)------------------------------------------------------
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', ($event) => {
            let contactToEdit = $event.target.parentElement.children[1].innerText
            enableDisableEditModal('enable')

            // Target Ids and settinginput values of Edit Modal ------------------------------------------------------
            let editName = document.getElementById('editName')
            let editFullName = document.getElementById('editFullName')
            let editAvatar = document.getElementById('editAvatar')
            let editPosition = document.getElementById('editPosition')
            let editFav = document.getElementById('editFav')
            let editEmail = document.getElementById('editEmail')
            let editAddress = document.getElementById('editAddress')

            for (let i = 0; i < cmtTableValues.length; i++) {
                if (contactToEdit === cmtTableValues[i].name) {
                    editName.value = cmtTableValues[i].name
                    editFullName.value = cmtTableValues[i].fullName
                    editAvatar.value = cmtTableValues[i].avatar
                    editPosition.value = cmtTableValues[i].jobPosition
                    editFav.value = cmtTableValues[i].favorite
                    editEmail.value = cmtTableValues[i].email
                    editAddress.value = cmtTableValues[i].address
                }
            }
            // Adding Input fields event Listeners ------------------------------------------------------

            function updateInputValues(input) {
                input.addEventListener('input', (e) => console.log(e.target.value))
                return input.value
            }

            editSubmitBtn.addEventListener('click', ($event) => {
                let editContactVar
                if ($event.target.innerText === 'Submit') {
                    console.log($event.target.innerText)
                    editContactVar = true
                    enableDisableEditModal('disable')

                    // Edit Contact ------------------------------------------------------
                    // let editContact = (userName) => {

                    // }
                    if (editContactVar) {
                        // Edit Contact Confirmed ------------------------------------------------------
                        let newEditName = updateInputValues(editName)
                        let newEditFullName = updateInputValues(editFullName)
                        let newEditAvatar = updateInputValues(editAvatar)
                        let newEditPosition = updateInputValues(editPosition)
                        let newEditFav = updateInputValues(editFav)
                        let newEditEmail = updateInputValues(editEmail)
                        let newEditAddress = updateInputValues(editAddress)
                        let editTableKeys = []
                        let editTableValues = []
                        let editTable = {}
                        let id

                        for (let i = 0; i < cmtTableValues.length; i++) {
                            if (contactToEdit !== cmtTableValues[i].name) {
                                editTableValues.push(cmtTableValues[i])
                                editTableKeys.push(`Contact${cmtTableValues[i].id}`)
                            } else if (contactToEdit === cmtTableValues[i].name) {
                                id = cmtTableValues[i].id
                            }
                        }

                        editTableValues = [...editTableValues, {
                            "id": id,
                            "name": `${newEditName}`,
                            "fullName": `${newEditFullName}`,
                            "avatar": `${newEditAvatar}`,
                            "jobPosition": `${newEditPosition}`,
                            "email": `${newEditEmail}`,
                            "address": `${newEditAddress}`,
                            "favorite": `${newEditFav}`.toLowerCase() == 'true' ? true : false
                        }]
                        editTableKeys = [...editTableKeys, `Contact${id}`]
                        editTableKeys.forEach((key, i) => editTable[key] = editTableValues[i])

                        localStorage.setItem("tableKey", JSON.stringify(editTable))

                        // editContact(contactToEdit)
                        editContactVar = false
                        console.log('Editing')
                        console.log(newEditName)

                        location.reload();
                        refreshDOMTable()
                    }
                }
            })
        })
    }

    // Functionality of delete buttons  ------------------------------------------------------
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', ($event) => {
            let nameToDelete = $event.target.parentElement.children[1].innerText
            console.log(nameToDelete)
            enableDisableDeleteConfirmModal('enable')
            let deleteContact
            // Confirm Delete Button
            confirmDeleteBtn.addEventListener('click', ($event) => {
                if ($event.target.innerText === 'Delete') {
                    deleteContact = true
                    enableDisableDeleteConfirmModal('disable')
                    if (deleteContact) {
                        // Delete user from table ------------------------------------------------------
                        deleteUserFromTable(nameToDelete)
                        deleteContact = false
                    }
                }
            })
        }
        )
    }

    // Delete Contact Confirmation ------------------------------------------------------
    let deleteUserFromTable = (userName) => {
        let tempTableKeys = []
        let tempTableValues = []
        let tempTable = {}

        for (let i = 0; i < cmtTableValues.length; i++) {
            if (userName !== cmtTableValues[i].name) {
                tempTableValues.push(cmtTableValues[i])
                tempTableKeys.push(`Contact${cmtTableValues[i].id}`)
                tempTableKeys.forEach((key, i) => tempTable[key] = tempTableValues[i])
            }
        }

        localStorage.setItem("tableKey", JSON.stringify(tempTable))
        location.reload();
        refreshDOMTable()
    }
}

// Setting contacts data using localStorage ------------------------------------------------------
let init = () => {
    if (localStorage.getItem("tableKey")) {
        cmtTable = JSON.parse(localStorage.getItem("tableKey"))
    } else {
        localStorage.setItem("tableKey", JSON.stringify(cmtTable))
    }
    refreshDOMTable()
}
init()
refreshDOMTable()
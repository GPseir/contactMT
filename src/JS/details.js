let cmtTable = JSON.parse(localStorage.getItem("tableKey"))
let contactKey = localStorage.getItem("contactKey")

// Main Table ------------------------------------------------------
let refreshDOMTable = () => {
    let cmtTableKeys = Object.keys(cmtTable) // ['Contact1','Contact2'...]

    let tableContainer = document.getElementById('cmt-table-container')
    let oldTableBody = document.getElementById('tableBody')
    tableContainer.removeChild(oldTableBody)

    let newTableBody = document.createElement('span')
    newTableBody.id = 'tableBodyDet'
    tableContainer.appendChild(newTableBody)

    // Create row divs ------------------------------------------------------
    for (let i = 0; i < cmtTableKeys.length; i++) {
        if (cmtTableKeys[i] === localStorage.getItem("contactKey")) {
            let currentRow = document.createElement('div')
            let currentAvatarCol = document.createElement('div')
            let currentFullNameCol = document.createElement('div')
            let currentEmailCol = document.createElement('div')
            let currentJobCol = document.createElement('div')
            let currentAddressCol = document.createElement('div')
            let currentSaveFavBtn = document.createElement('div')

            // Assign classNames to the row divs ------------------------------------------------------
            currentRow.className = 'cmt-table-row'
            currentAvatarCol.className = 'cmt-table-column cmt-avatar'
            currentFullNameCol.className = 'cmt-table-column cmt-name'
            currentEmailCol.className = 'cmt-table-column cmt-email'
            currentJobCol.className = 'cmt-table-column cmt-position'
            currentAddressCol.className = 'cmt-table-column cmt-address'
            currentSaveFavBtn.className = 'cmt-table-column cmt-saveFav'
            currentSaveFavBtn.id = 'saveFav'

            // Build the inner HTML text, img and icons ------------------------------------------------------
            currentAvatarCol.innerHTML = cmtTable[cmtTableKeys[i]].avatar
            currentFullNameCol.innerHTML = cmtTable[cmtTableKeys[i]].fullName
            currentEmailCol.innerHTML = cmtTable[cmtTableKeys[i]].email
            currentJobCol.innerHTML = cmtTable[cmtTableKeys[i]].jobPosition
            currentAddressCol.innerHTML = cmtTable[cmtTableKeys[i]].address
            if (cmtTable[cmtTableKeys[i]].favorite === true) {
                currentSaveFavBtn.innerHTML = '<i class="fas fa-star"></i>'
            }
            else { currentSaveFavBtn.innerHTML = '<i class="far fa-star"></i>' }

            // Append row elements to the newTableBody ------------------------------------------------------

            currentRow.appendChild(currentAvatarCol)
            currentRow.appendChild(currentFullNameCol)
            currentRow.appendChild(currentEmailCol)
            currentRow.appendChild(currentJobCol)
            currentRow.appendChild(currentAddressCol)
            currentRow.appendChild(currentSaveFavBtn)
            newTableBody.appendChild(currentRow)
        }
    }

    // Target table buttons ------------------------------------------------------
    let detailsGoToAdd = document.getElementById('detailsGoToAdd')
    let saveFavBtn = document.getElementById('saveFav')
    let goBackBtn = document.getElementById('detailsGoBack')

    // Add Contact Button ------------------------------------------------------
    let url = `cmt.html`
    detailsGoToAdd.addEventListener('click', ($event) => {
        localStorage.setItem("tableKey", JSON.stringify(cmtTable))
        localStorage.setItem("contactKey", ($event.target.id))
        localStorage.setItem("modal", ('enable'))
        window.location.href = url;
    })
    detailsGoBack.addEventListener('click', ($event) => { window.location.href = url; })


    // Save Favorite Contact ------------------------------------------------------
    saveFavBtn.addEventListener('click', ($event) => {
        cmtTable[contactKey].favorite = !cmtTable[contactKey].favorite
        //console.log(cmtTable[contactKey].favorite)
        localStorage.setItem("tableKey", JSON.stringify(cmtTable))
        location.reload();
    })
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

refreshDOMTable()
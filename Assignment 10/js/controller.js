const Actions = {
    None: 0,
    Add: 1,
    Delete: 2,
    View: 3,
};

const bmName = document.querySelector(".mainForum #bmName");
const bmUrl = document.querySelector(".mainForum #bmUrl");
const mainBtn = document.querySelector(".mainForum .modern-button");
const tableBody = document.querySelector("#tableBody");
const bmInputs = document.querySelectorAll(".mainForum .modern-input");

var myBookmarkList = JSON.parse(localStorage.getItem("myBookmarkList"));
if (!myBookmarkList) {
    myBookmarkList = [];
    localStorage.setItem("myBookmarkList", JSON.stringify(myBookmarkList));
}
else {
    UpdateItems(null, Actions.View);
}


mainBtn.addEventListener('click', () => { AddBookmark(); });
for (var i = 0; i < bmInputs.length; i++) {
    bmInputs[i].addEventListener('keyup', function () {
        ValidateInputs(this);
    });
}

const regPatterns = {
    bmName: /^[a-zA-Z0-9]{3,20}$/,
    bmUrl: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
};

function ValidateInputs(element, print = false) {
    var isValid = regPatterns[element.id].test(element.value);
    element.classList.remove('is-valid', 'is-invalid');
    if (element.value.length > 0 || print) {
        element.classList.add(isValid ? 'is-valid' : 'is-invalid');
    }
    return isValid;
}

function UpdateItems(arg, action) {
    switch (action) {
        case Actions.Add: {
            let urlValue = bmUrl.value;
            if (!urlValue.startsWith("http://") && !urlValue.startsWith("https://")) {
                urlValue = `http://${urlValue}`;
            }
            myBookmarkList.push({ name: bmName.value, url: urlValue });
            bmName.value = bmUrl.value = '';
            UpdateItems(null, Actions.View);
            break;
        }
        case Actions.Delete: {
            myBookmarkList.splice(arg, 1);
            UpdateItems(null, Actions.View);
            break;
        }
        case Actions.View: {
            var content = '';

            for (var i = 0; i < myBookmarkList.length; i++) {
                const info = myBookmarkList[i];
                content +=
                    `<tr>
                <td>${i + 1}</td>
                <td>${info.name}</td>
                <td><a href="${info.url}" class="visit-btn" target="_blank">Visit</a></td>
                <td><button onclick="DeleteBookmark(${i})" class="modern-button w-50 rounded-1 py-0 px-3">Delete</button></td>
                </tr>`;
            }
            tableBody.innerHTML = content;
            break;
        }
    }
    if (action != Actions.View)
        localStorage.setItem("myBookmarkList", JSON.stringify(myBookmarkList));
}
function AddBookmark() {
    const v1 = ValidateInputs(bmName, true);
    const v2 = ValidateInputs(bmUrl, true);

    if (v1 && v2) {
        UpdateItems(null, Actions.Add);
    } else {
        Swal.fire({
            html: `
            <div class="text-start">
                <h3 class="text-center">Site Name or Url is not valid, Please follow the rules below</h3>
                <p><i class="fa-regular fa-circle-right p-2"></i>Site name must contain at least 3 characters</p>
                <p><i class="fa-regular fa-circle-right p-2"></i>Site URL must be a valid one</p>
                </div>`,
            icon: 'error',
            confirmButtonText: 'Alright'
        });

    }
}
function DeleteBookmark(id) {
    UpdateItems(id, Actions.Delete);
}

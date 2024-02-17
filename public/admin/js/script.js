// const { parse } = require("dotenv");

//FILTER
const buttonStatus = document.querySelectorAll("[button_status]");

if(buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button_status");
            
            // console.log(status);
            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;

        })
    })
}
//END FILTER

//FORM SEARCH
    const formSearch = document.querySelector("#form-search");
    if(formSearch) {
        let url = new URL(window.location.href);
        formSearch.addEventListener("submit", (e) => {
            e.preventDefault();
            const key = e.target.elements.keyword.value;
            if(key) {
                url.searchParams.set("keyword", key);
            } else {
                url.searchParams.delete("keyword");
            }
            window.location.href = url.href;
        })
    }
//END FORMSEARCH


//START PAGINATION
const page = document.querySelectorAll(".page-link");
if(page) {
    let url = new URL(window.location.href);
    page.forEach((button) => {
        button.addEventListener("click", () => {
            url.searchParams.set("page", button.getAttribute("button-pagination"));
            window.location.href = url.href;
        })
        
    })
}

//END PAGINATION


//checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsID = checkboxMulti.querySelectorAll("input[name='id']");
    // checkall event
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsID.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsID.forEach(input => {
                input.checked = false;
            })
        }
    })
    //
    inputsID.forEach(input => {
        input.addEventListener("click", () => {
            const count = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(count == inputsID.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}
// end checkbox multi

// // form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
const typeChange = document.querySelector("[optionSelected]");
var selectedValue = "";
if(formChangeMulti) {
    typeChange.addEventListener("change", () => {
        selectedValue = typeChange.value;
    })
    formChangeMulti.addEventListener("submit", (e) => {
      e.preventDefault();
       const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        if(inputsChecked.length > 0) {
            let ids = [];
            const formApply = document.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                if(selectedValue == "change-position") {
                     const position = (input
                       .closest("tr")
                        .querySelector("input[name='position']").value);
                        ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }
            })
            formApply.value = ids.join(", ");
            formChangeMulti.submit();

        } else {
            alert("Chọn ít nhất một bản ghi");
        }
    })
}
// end form change multi


//show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)
}
// end show alert


//upload img
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImgInput = document.querySelector("[upload-image-input]");
    const uploadImgPreview = document.querySelector("[upload-image-preview]");
    uploadImgInput.addEventListener("change", (e) => {
        const [file] = e.target.files;
        console.log(file);
        if(file) {
            uploadImgPreview.src = URL.createObjectURL(file);
            console.log(uploadImgPreview.src);
        }
    })
}
// end upload img
//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = (statusCurrent == "active") ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}` + "?_method=PATCH";
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
//end change-status

//delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có muốn xóa sản phẩm này không?");
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                const action = path + `/${id}` + "?_method=PATCH";
                formDeleteItem.action = action;
                formDeleteItem.submit();
                
            }
        })
    })
}
// end delete item
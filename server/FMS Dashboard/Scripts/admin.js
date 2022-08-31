async function addUser() {    
    var userDDL = $("#domainName").data("kendoComboBox");
    userDDL.dataSource.read();
    userDDL.refresh();
    userDDL.value("");
    $("#NewUserModal").modal("show");
}

function cBoxChanged(e) {
    var widget = e.sender;

    if (widget.value() && widget.select() === -1) {
        //custom has been selected
        widget.value(""); //reset widget
    }
}

async function addNewUser_Submit() {
    var form = $("#AddUserForm")[0];
    if (form.checkValidity() === false) {
    } else {
        var data = {
            domainName: $("#domainName").data("kendoComboBox").value(),
            roleId: $("#roleId").data("kendoDropDownList").value()
        }

        const res = await fetch('./Admin/CreateUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (!json.errors) {
            $("#NewUserModal").modal("hide");
            reloadUserGrid();
        }
    }    
}

function reloadUserGrid() {
    var userGrid = $("#userGrid").data("kendoGrid");
    userGrid.dataSource.read();
    userGrid.refresh();
}

$(function () {
    $("#AddUserForm").submit((e) => {
        e.preventDefault();
        addNewUser_Submit();
    })
    $("form").kendoValidator({
        messages: {
            required: "Please select a MAG user before trying to add.",
        }

    });
});
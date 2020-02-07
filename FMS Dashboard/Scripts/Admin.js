async function GetData() {
    const res = await fetch("../Admin/GetADUsers");
    const data = await res.json();
    return data;
}

// GetData().then((data) => {
//     data.forEach(user => {
//         $("#test").append(`<div>${user.firstName} ${user.lastName} (${user.id})</div>`);
//     });

// })
$(function() {
    setupUserRoleGrid();
});

async function getUserRoleData() {
    const res = await fetch("../Admin/GetUserRole");
    const data = await res.json();
    console.log(data);

    return data;
}

async function setupUserRoleGrid() {

    const userData = await getUserRoleData();

    $("#userGrid").kendoGrid({
        dataSource: {
            data: userData
        },
        height: 400,
        columns: [{
            field: "name",
            title: "User"
        }, {
            field: "role",
            title: "Role"
        }, {
            command: ["edit", "destroy"],
            title: "&nbsp;",
            width: "250px"
        }],
        editable: "popup",
        toolbar: ["create"]
    });



}
let input = document.getElementById('excelSheet');
let tableData = document.getElementById('tableRows');

input.addEventListener('change', function () {

    if (this.files && this.files[0]) {

        var myFile = this.files[0];
        Papa.parse(myFile, {
            complete: function (results) {
                tableData.innerHTML = "";
                console.log(results);

                var rowCount = 0;
                var colCount = 0;

                results.data.forEach(row => {
                    var curTableCell = document.createElement("tr");

                    row.forEach(cell => {
                        var tableCell = document.createElement("td");
                        tableCell.innerText = cell;
                        tableCell.id = rowCount + " " + colCount;
                        tableCell.addEventListener("dblclick", editCell);
                        curTableCell.appendChild(tableCell);
                        colCount++;
                    });

                    tableData.appendChild(curTableCell);
                    rowCount++;
                });
            }
        });
    }
});

function openFileReader() {
    input.click();
}

function editCell(event) {
    var location = event.target.id;
    //document.getElementById("editBox")?.remove();

    var editElem = document.createElement("textarea");
    var cellBounds = document.getElementById(location).getBoundingClientRect();

    editElem.id = "editBox";
    editElem.type = "text";
    editElem.value = document.getElementById(location).innerText;
    editElem.style.position = "absolute";
    editElem.style.width = cellBounds.width + "px";
    editElem.style.height = cellBounds.height + "px";
    editElem.style.left = cellBounds.left + "px";
    editElem.style.top = cellBounds.top + "px";
    document.getElementById(location).appendChild(editElem);
    editElem.focus();

    editElem.addEventListener("change", () => {
        console.log("change");
        document.getElementById(location).innerText = editElem.value;
    });

    editElem.addEventListener("blur", () => {
        document.getElementById("editBox")?.remove();
    })
}

document.getElementById("dataSection").addEventListener("scroll", () => {
    document.getElementById("editBox")?.remove();
});
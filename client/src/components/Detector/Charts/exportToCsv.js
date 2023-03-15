function exportToCsv(data) {
    // Define the columns to exclude from the CSV output
    const excludedColumns = ["id", "reportId", "isPeriod1", "year"];

    // Extract the headers of the first row, excluding the excluded columns
    const headers = Object.keys(data)
        .filter((key) => !excludedColumns.includes(key))
        .join(",");

    // Extract the rows of the data array, excluding the excluded columns
    const rows = data
        .map((row) =>
            Object.entries(row)
                .filter(([key]) => !excludedColumns.includes(key))
                .map(([_, value]) => value)
                .join(",")
        )
        .join("\n");

    // Combine the headers and rows into a CSV string with a header row
    const csv = `${headers}\n${rows}`;

    // Create a Blob object and download the file
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.click();
}

export default exportToCsv;

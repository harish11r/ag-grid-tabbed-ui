import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Grid,
    IconButton,
    TextField
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import StopIcon from "@material-ui/icons/Stop";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";



function TableView(props) {

    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        // setRowData(props.rowData);
        // console.log(props.rowData);
        if (gridApi) {
            gridApi.setRowData(props.rowData);
        }
    }, [props.rowData, gridApi]);

    function yearCellRenderer(props) {
        return (
            <div>
                {props.data.yearData.map((d) => (
                    <div key={d.year} style={{ color: d.selected ? "#FFA500" : "gray" }}>{d.year}</div>
                ))}
            </div>
        );
    }

    const addCellRenderer = (props) => {
        return (
            <div>
                {props.data.yearData.map((d) => (
                    <div key={d.year}><input type='checkbox' checked={d.selected} onChange={() => {
                        props.rowCheckChanged(props.data.id, d.year)
                    }} /></div>
                ))}
            </div>
        );
    }

    const columnDefs = [
        {
            field: "athlete",
            minWidth: 190
        },
        {
            field: "age",
            // editable: true,
            // cellRenderer: (params) => {
            //     return `<input type='checkbox' ${params.value > 20 ? "checked" : ""
            //         } />`;
            // }
        },
        {
            field: "year",
            cellRenderer: "yearCellRenderer",
        },
        {
            field: "add",
            cellRenderer: "addCellRenderer",
            cellRendererParams: {
                rowCheckChanged: props.rowCheckChanged
            }
        },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" }
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 90,
        resizable: true,
        sortable: true,

    };

    const paginationPageSize = 10;

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const getRowNodeId = data => {
        return data.id;
    }

    const onPageSizeChanged = (e) => {
        var value = e.target.value;
        gridApi.paginationSetPageSize(Number(value));
    };

    const onFilterTextBoxChanged = (e) => {
        const value = e.target.value;
        gridApi.setQuickFilter(value);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Grid
                            container
                            spacing={1}
                            alignItems="flex-end"
                            style={{ marginTop: "-25px" }}
                        >
                            <Grid item>
                                <SearchIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Search" onChange={onFilterTextBoxChanged} />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            style={{ marginTop: "-20px" }}
                        >
                            <Grid item>
                                <Typography variant="body2">View</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <ViewModuleIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <FormatListBulletedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                    <Box>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <StopIcon style={{ color: "#FFA500" }} />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    style={{ color: "#FFA500" }}
                                >
                                    {"Data1"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <StopIcon style={{ color: "gray" }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ color: "gray" }}>
                                    {"Data2"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>

                    <AgGridReact
                        getRowNodeId={getRowNodeId}
                        onGridReady={onGridReady}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={paginationPageSize}
                        rowData={rowData}
                        rowHeight={120}
                        deltaRowDataMode={true}
                        frameworkComponents={{
                            yearCellRenderer,
                            addCellRenderer
                        }}
                    />
                    <div className="example-header">
                        Page Size:
                        <select onChange={onPageSizeChanged} id="page-size" defaultValue={10}>
                            <option value="10">
                                10
                            </option>
                            <option value="100">50</option>
                            <option value="500">100</option>
                        </select>
                    </div>
                </div>
            </Grid>
        </Grid>);
}

export default TableView;
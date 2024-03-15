import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow,
    createTableColumn,
    useTableColumnSizing_unstable,
    useTableFeatures,
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
} from "@fluentui/react-components";
import PropTypes from 'prop-types'

const createTableColumnDef = (columnData) => {
    return columnData.map(({ columnId, headerLabel }) => {
        return createTableColumn({
            columnId,
            renderHeaderCell: () => <>{headerLabel}</>,
        });
    });
};

const TableList = ({ columnsData, items, backgroundColor }) => {

    const [columns] = useState(createTableColumnDef(columnsData));

    const [columnSizingOptions] = useState(() => {
        const options = {};
        columnsData.forEach(({ columnId, defaultWidth }) => {
            options[columnId] = {  defaultWidth};
        });
        return options;
    });

    const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
        {
            columns,
            items,
        },
        [useTableColumnSizing_unstable({ columnSizingOptions })]
    );

    const rows = getRows();

    return (
        <Table
            sortable
            aria-label="Table with sort"
            ref={tableRef}
            {...columnSizing_unstable.getTableProps()}
            style={{ marginTop: '10px', backgroundColor: backgroundColor, boxShadow: '0 1px 7px 0 #33333329' }}
        >
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <Menu openOnContext key={column.columnId}>
                            <MenuTrigger>
                                <TableHeaderCell
                                    key={column.columnId}
                                    {...columnSizing_unstable.getTableHeaderCellProps(
                                        column.columnId
                                    )}
                                >
                                    {column.renderHeaderCell()}
                                </TableHeaderCell>
                            </MenuTrigger>
                            <MenuPopover>
                                <MenuList>
                                    <MenuItem
                                        onClick={columnSizing_unstable.enableKeyboardMode(
                                            column.columnId
                                        )}
                                    >
                                        Keyboard Column Resizing
                                    </MenuItem>
                                </MenuList>
                            </MenuPopover>
                        </Menu>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.rowId}>
                        {Object.keys(row.item).map((val, index) => (
                            <TableCell key={index} {...columnSizing_unstable.getTableCellProps(val)}>
                                <TableCellLayout truncate>{row.item[val]}</TableCellLayout>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableList

TableList.propTypes = {
    columnsData: PropTypes.array,
    items: PropTypes.array,
    columnSizingOptions: PropTypes.array,
    backgroundColor: PropTypes.string
}
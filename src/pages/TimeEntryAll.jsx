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
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  DocumentPdfRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  PeopleRegular,
  VideoRegular,
} from "@fluentui/react-icons";

import { HeaderPageForm } from "../components/FormComponent/HeaderPageForm";
import { DynamicTablistMenu } from "../components/Tablist"; 
import { tabsTimeEntry } from "../helpers/tabArrayHelper";

const columnsDef = [
  createTableColumn({
    columnId: "id",
    renderHeaderCell: () => <>ID</>,
  }),
  createTableColumn({
    columnId: "entryDate",
    renderHeaderCell: () => <>Entry Date</>,
  }),
  createTableColumn({
    columnId: "unitType",
    renderHeaderCell: () => <>Unit Type</>,
  }),
  createTableColumn({
    columnId: "totalUnit",
    renderHeaderCell: () => <>Total Unit</>,
  }),
  createTableColumn({
    columnId: "entryBy",
    renderHeaderCell: () => <>Entry By</>,
  }),
];

const items = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 3 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 1 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];


const TimeEntryAll = () => {
  const [columns] = useState(columnsDef);
  const [columnSizingOptions] = useState({
    file: {
      idealWidth: 200,
      minWidth: 150,
    },
    author: {
      minWidth: 110,
      defaultWidth: 250,
    },
    lastUpdate: {
      minWidth: 150,
    },
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
    <>
    <HeaderPageForm title={`Time Entry From Data Collector`} />
      <div className="form-wrapper">
      <div className='row'>
          <div className='col-6'>
            <DynamicTablistMenu
              tabs={tabsTimeEntry}
              active='time-entry-collector'
            />
          </div>
        </div>
        <Table
          sortable
          aria-label="Table with sort"
          ref={tableRef}
          {...columnSizing_unstable.getTableProps()}
          style={{marginTop: '10px'}}
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
            {rows.map(({ item }) => (
              <TableRow key={item.file.label}>
                <TableCell {...columnSizing_unstable.getTableCellProps("file")}>
                  <TableCellLayout truncate media={item.file.icon}>
                    {item.file.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("author")}
                >
                  <TableCellLayout
                    truncate
                    media={
                      <Avatar
                        name={item.author.label}
                        badge={{
                          status: item.author.status,
                        }}
                      />
                    }
                  >
                    {item.author.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("lastUpdated")}
                >
                  <TableCellLayout truncate>
                    {item.lastUpdated.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell
                  {...columnSizing_unstable.getTableCellProps("lastUpdate")}
                >
                  <TableCellLayout truncate media={item.lastUpdate.icon}>
                    {item.lastUpdate.label}
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TimeEntryAll;

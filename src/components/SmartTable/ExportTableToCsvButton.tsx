import { useState } from 'react';
import { Box, Button, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconDownload } from '@tabler/icons-react';
import type { MRT_Row } from 'mantine-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import type { TableToolbarActionsProps } from './SmartTable';

const getCsvConfig = (filename: string) =>
  mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename,
  });

/** Convert object/array values to strings so export-to-csv accepts them */
function toCsvSafeRow<T extends Record<string, unknown>>(
  row: T,
): Record<string, string | number | boolean | null | undefined> {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        return [key, value];
      }
      return [key, JSON.stringify(value)];
    }),
  ) as Record<string, string | number | boolean | null | undefined>;
}

function getRowDate(row: Record<string, unknown>, dateField: string): Date | null {
  const value = row[dateField];
  if (value == null) return null;
  const d = typeof value === 'string' ? new Date(value) : value instanceof Date ? value : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
}

function filterRowsByDateRange<T extends Record<string, unknown>>(
  rows: { original: T }[],
  dateField: string,
  dateFrom: Date | null,
  dateTo: Date | null,
): { original: T }[] {
  if (!dateFrom && !dateTo) return rows;
  return rows.filter((row) => {
    const rowDate = getRowDate(row.original, dateField);
    if (!rowDate) return false;
    const dayStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayEnd = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    if (dateFrom && rowDate < dayStart(dateFrom)) return false;
    if (dateTo && rowDate > dayEnd(dateTo)) return false;
    return true;
  });
}

function filterDataByDateRange<T extends Record<string, unknown>>(
  data: T[],
  dateField: string,
  dateFrom: Date | null,
  dateTo: Date | null,
): T[] {
  if (!dateFrom && !dateTo) return data;
  return data.filter((row) => {
    const rowDate = getRowDate(row, dateField);
    if (!rowDate) return false;
    const dayStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayEnd = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    if (dateFrom && rowDate < dayStart(dateFrom)) return false;
    if (dateTo && rowDate > dayEnd(dateTo)) return false;
    return true;
  });
}

export function ExportTableToCsvButton<T extends Record<string, unknown>>({
  table,
  data,
  fileNameOnExport = 'export',
  dateRangeField,
}: TableToolbarActionsProps<T>) {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const csvConfig = getCsvConfig(fileNameOnExport);

  const applyDateFilter = (rows: MRT_Row<T>[]) => {
    if (!dateRangeField) return rows;
    return filterRowsByDateRange(rows, dateRangeField, dateFrom, dateTo) as MRT_Row<T>[];
  };

  const handleExportRows = (rows: MRT_Row<T>[]) => {
    const filtered = applyDateFilter(rows);
    const rowData = filtered.map((row) => toCsvSafeRow(row.original));
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const filtered = dateRangeField
      ? filterDataByDateRange(data, dateRangeField, dateFrom, dateTo)
      : data;
    const rowData = filtered.map((row) => toCsvSafeRow(row));
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '16px',
        padding: '8px',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
      }}
    >
      {dateRangeField && (
        <Box sx={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <Box>
            <Text size="xs" c="dimmed" mb={4}>
              From
            </Text>
            <DateInput
              value={dateFrom}
              onChange={setDateFrom}
              placeholder="From date"
              size="xs"
              clearable
              maxDate={dateTo ?? undefined}
            />
          </Box>
          <Box>
            <Text size="xs" c="dimmed" mb={4}>
              To
            </Text>
            <DateInput
              value={dateTo}
              onChange={setDateTo}
              placeholder="To date"
              size="xs"
              clearable
              minDate={dateFrom ?? undefined}
            />
          </Box>
        </Box>
      )}
      <Button
        color="lightblue"
        onClick={handleExportData}
        leftSection={<IconDownload size={16} />}
        variant="filled"
        size="xs"
      >
        Export All Data
      </Button>
      <Button
        disabled={
          !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
        }
        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
        leftSection={<IconDownload size={16} />}
        variant="filled"
        size="xs"
      >
        Export Selected Rows
      </Button>
    </Box>
  );
}

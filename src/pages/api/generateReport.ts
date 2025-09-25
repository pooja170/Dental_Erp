import type { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { templateId, startDate, endDate, storeId } = req.query;
  console.log("Received request for templateId:", templateId);
  console.log("Filters - Start Date:", startDate, "End Date:", endDate, "Store ID:", storeId);

  if (!templateId || typeof templateId !== 'string') {
    return res.status(400).send("Template ID is required");
  }

  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: { reports: true },
    });
    console.log("Fetched template from DB:", JSON.stringify(template, null, 2));

    if (!template) {
      return res.status(404).send("Template not found");
    }

    let reportData = template.reports[0]?.data as any[];
    console.log("Extracted report data:", reportData);
    if (!reportData) {
      return res.status(404).send("Report data not found for this template");
    }

    let filteredData = reportData;

    // Apply date range filter
    if (startDate && endDate && typeof startDate === 'string' && typeof endDate === 'string') {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = filteredData.filter((row: any) => {
        if (row.Date) {
          const rowDate = new Date(row.Date);
          return rowDate >= start && rowDate <= end;
        }
        return false;
      });
    }

    // Apply store/department filter
    if (storeId && typeof storeId === 'string') {
      filteredData = filteredData.filter((row: any) => {
        // Assuming 'Store' is the field name in your report data
        return row.Store === storeId;
      });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    worksheet.columns = (template.columns as string[]).map((column) => ({
      header: column,
      key: column,
      width: 20,
    }));

    worksheet.addRows(filteredData);

    (template.calculations as any[]).forEach((calc) => {
      const targetColumn = worksheet.getColumn(calc.name);
      if (targetColumn) {
        for (let i = 2; i <= filteredData.length + 1; i++) {
          worksheet.getCell(`${targetColumn.letter}${i}`).value = {
            formula: calc.formula.replace(/2/g, i.toString()),
          };
        }
      }
    });

    const layout = template.layout as any;
    if (layout.headerColor) {
      const header = worksheet.getRow(1);
      header.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: layout.headerColor },
      };
      header.font = {
          bold: true
      }
    }

    if (layout.currencyFormattedColumns) {
      (layout.currencyFormattedColumns as string[]).forEach((colName) => {
        const column = worksheet.getColumn(colName);
        if (column) {
          column.numFmt = "$#,##0.00";
        }
      });
    }

    workbook.calcProperties.fullCalcOnLoad = true;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error fetching from database:", error);
    res.status(500).json({ error: "Failed to generate report", details: error.message });
  }
}
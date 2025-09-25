import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const template1 = await prisma.template.create({
    data: {
      name: 'Monthly P&L - DB',
      description: 'Profit & Loss for all stores from DB',
      columns: ["Store", "Revenue", "Expenses", "Profit"],
      calculations: [{ name: 'Profit', formula: '=B2-C2' }],
      layout: {
        headerColor: 'fde9d9',
        currencyFormattedColumns: ['Revenue', 'Expenses', 'Profit'],
      },
    },
  });

  await prisma.report.create({
    data: {
      templateId: template1.id,
      data: [
        { Store: 'Store A', Revenue: 5000, Expenses: 3000 },
        { Store: 'Store B', Revenue: 7000, Expenses: 4000 },
        { Store: 'Store C', Revenue: 4500, Expenses: 2500 },
      ],
    },
  });

  const template2 = await prisma.template.create({
    data: {
      name: 'Cashflow Analysis Q3 - DB',
      description: 'Quarterly cashflow analysis from DB',
      columns: ["Date", "Inflow", "Outflow", "Net Cashflow"],
      calculations: [{ name: 'Net Cashflow', formula: '=B2-C2' }],
      layout: {
        headerColor: 'c5d9f1',
        currencyFormattedColumns: ['Inflow', 'Outflow', 'Net Cashflow'],
      },
    },
  });

  await prisma.report.create({
    data: {
      templateId: template2.id,
      data: [
        { Date: '2023-07-01', Inflow: 10000, Outflow: 8000 },
        { Date: '2023-08-01', Inflow: 12000, Outflow: 9000 },
        { Date: '2023-09-01', Inflow: 15000, Outflow: 11000 },
      ],
    },
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

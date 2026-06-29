import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function escapeString(str) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'boolean') return str ? 'TRUE' : 'FALSE';
    if (typeof str === 'number') return str;
    if (str instanceof Date) return `'${str.toISOString()}'`;
    return `'${String(str).replace(/'/g, "''")}'`;
}

async function backupTable(tableName, data) {
    if (data.length === 0) return '';
    const columns = Object.keys(data[0]);
    let sql = `-- Data for Name: ${tableName}\n`;
    
    for (const row of data) {
        const values = [];
        for (const col of columns) {
            values.push(await escapeString(row[col]));
        }
        sql += `INSERT INTO "${tableName}" ("${columns.join('", "')}") VALUES (${values.join(', ')});\n`;
    }
    return sql + '\n';
}

async function main() {
    let sql = `-- Supabase Database Backup\n-- Generated on ${new Date().toISOString()}\n\n`;

    const users = await prisma.user.findMany();
    sql += await backupTable('users', users);

    const departments = await prisma.department.findMany();
    sql += await backupTable('departments', departments);

    const doctors = await prisma.doctor.findMany();
    sql += await backupTable('doctors', doctors);

    const staff = await prisma.staff.findMany();
    sql += await backupTable('staff', staff);

    const appointments = await prisma.appointment.findMany();
    sql += await backupTable('appointments', appointments);

    fs.writeFileSync('C:\\Users\\Jenil\\OneDrive\\Desktop\\new\\supabase_backup.sql', sql);
    console.log('Backup successful!');
}

main().catch(console.error).finally(() => prisma.$disconnect());

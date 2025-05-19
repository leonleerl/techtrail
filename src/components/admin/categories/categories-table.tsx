import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Button
  } from "@/components/ui"
  
  const invoices = [
    {
      id: "INV001",
      name: "C#",
    },
    {
      id: "INV002",
      name: "Java",
    },
    {
      id: "INV003",
      name: "Python",
    },
    {
      id: "INV004",
      name: "JavaScript",
    },
    
  ]
  
function CategoriesTable() {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Operation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell className="font-medium">
                <Button variant="default">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  export { CategoriesTable };
import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BranchPerformance() {
  return (
    <div className="mx-4">
      <PageHeader name="Branch Performance" />
      <div className="grid grid-cols-1 gap-2 mt-2 lg:grid-cols-4">
        <Card className="col-span-1 lg:col-span-2 lg:row-span-2 max-h-[300px] overflow-y-auto bg-gradient-to-tl from-gray-50 to-slate-100">
          <CardHeader>
            <CardTitle>Branch Wise Turnover Status</CardTitle>
            <CardDescription>
              show data for branch wise turnover
            </CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Branch
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Daily
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Weekly
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Monthly
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Yearly
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-2">Silver</td>
                  <td className="px-6 py-2">Laptop</td>
                  <td className="px-6 py-2">$2999</td>
                  <td className="px-6 py-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-2">White</td>
                  <td className="px-6 py-2">Laptop PC</td>
                  <td className="px-6 py-2">$1999</td>
                  <td className="px-6 py-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-2">Black</td>
                  <td className="px-6 py-2">Accessories</td>
                  <td className="px-6 py-2">$99</td>
                  <td className="px-6 py-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Google Pixel Phone
                  </th>
                  <td className="px-6 py-2">Gray</td>
                  <td className="px-6 py-2">Phone</td>
                  <td className="px-6 py-2">$799</td>
                  <td className="px-6 py-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple Watch 5
                  </th>
                  <td className="px-6 py-2">Red</td>
                  <td className="px-6 py-2">Wearables</td>
                  <td className="px-6 py-2">$999</td>
                  <td className="px-6 py-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Branch Wise Margin Status</CardTitle>
          </CardHeader>
          <CardContent>Something</CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Branch Wise Exposure Status</CardTitle>
          </CardHeader>
          <CardContent>Something</CardContent>
        </Card>
        <Card className="col-span-4 shadow-md">
          <CardHeader>
            <CardTitle>Branch Wise Fund Status(Till Today)</CardTitle>
          </CardHeader>
          <CardContent>Something</CardContent>
        </Card>
      </div>
    </div>
  );
}

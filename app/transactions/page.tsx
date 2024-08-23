import { getTransactions } from "../db/queries";

import TransactionsList from "./list";
import NewTranactionForm from "./form";

import { title } from "@/components/primitives";

export default async function TransactionsPage() {
  const { transactions } = await getTransactions();

  return (
    <>
      <div className="w-full flex flex-col gap-2 my-3">
        <div className="flex items-center justify-between">
          <h1 className={title()}>Transactions</h1>
          <NewTranactionForm />
        </div>
        <TransactionsList transactions={transactions} />
      </div>
    </>
  );
}

import Layout from "@/components/Layout";
import Modal, { ModalType } from "@/components/Modal";
import ModalDelete from "@/components/ModalDelete";
import { useSession } from "@/contexts/session";
import { TransactionDTO } from "@/domain/Transaction";
import { useEffect, useState } from "react";

export default function Transactions(props: any) {
    const { balance, transactions, accounts } = useSession();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);
    const [modalDeleteData, setModalDeleteData] = useState<any>(null);
    const [type, setType] = useState<ModalType>('');
    const [transactionsData, setTransactionsData] = useState<TransactionDTO[]>([]);

    const handleModalOpen = (type: ModalType, data: any) => {
        setModalData(data);
        setType(type);
        setModalOpen(true);
    };

    const handleOpenModalDelete = (transaction: any) => {
        setModalDeleteOpen(true);
        setModalDeleteData(transaction);
    };

    const formatDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        return formattedDate;
    };

    useEffect(() => {
        const transactionsWithAccountNames = transactions.map((transaction) => {
            const account = accounts.find((account) => account.id === transaction.accountId);
            const accountName = account ? account.name : "";
            return { ...transaction, accountName };
        });
        setTransactionsData(transactionsWithAccountNames);
    }, [accounts, transactions]);

    return (
        <Layout>
            <div className="container mx-auto px-4">
                <div className="lg:flex max-md:grid lg:grid-cols-2 lg:gap-4 mb-4">
                    <div className="lg:w-4/5 max-md:order-last overflow-x-auto">
                        <div className="overflow-auto">
                            <table className="table table-zebra w-full border-spacing-0 border-collapse">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Account</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionsData?.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center">No transactions found</td>
                                        </tr>
                                    ) : (
                                        <>
                                            {transactionsData?.map((transaction: any) => (
                                                <tr key={transaction.id}>
                                                    <td>{formatDate(transaction.date)}</td>
                                                    <td>{transaction.description}</td>
                                                    <td>{transaction.accountName}</td>
                                                    <td className={
                                                        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                                                    }>R$ {transaction.amount}</td>
                                                    <td>
                                                        <label
                                                            htmlFor="my-modal"
                                                            className="btn btn-primary mr-2"
                                                            onClick={() => handleModalOpen(transaction.type, transaction)}
                                                        >
                                                            Edit
                                                        </label>
                                                        <label
                                                            htmlFor="modal-delete"
                                                            className="btn btn-secondary"
                                                            onClick={() => handleOpenModalDelete(transaction)}
                                                        >
                                                            Delete
                                                        </label>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="lg:w-1/5 w-full max-md:order-first">
                        <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2">
                            <div className="font-medium text-slate-400">Balance</div>
                            <div className="font-medium text-neutral-600 text-4xl">R$ {balance?.totalBalance}</div>
                        </div>
                        <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
                            <div className="font-medium text-slate-400">Expenses</div>
                            <div className="font-medium text-red-600 text-4xl">R$ {balance?.totalExpenses}</div>
                        </div>
                        <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
                            <div className="font-medium text-slate-400">Incomes</div>
                            <div className="font-medium text-green-600 text-4xl">R$ {balance?.totalIncomes}</div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    action="edit"
                    type={type}
                    onClose={() => setModalOpen(false)}
                    data={modalData}
                />
            )}
            {isModalDeleteOpen && (
                <ModalDelete
                    type="transaction"
                    data={modalDeleteData}
                    onClose={() => setModalDeleteOpen(false)}
                />
            )}
        </Layout>
    );
}

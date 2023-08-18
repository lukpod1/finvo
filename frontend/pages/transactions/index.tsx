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
    const [modalDeleteData, setModalDeleteData] = useState<TransactionDTO>();
    const [type, setType] = useState<ModalType>('');
    const [transactionsData, setTransactionsData] = useState<TransactionDTO[]>([]);

    const handleModalOpen = (type: ModalType, data: any) => {
        setModalData(data);
        setType(type);
        setModalOpen(true);
    };

    const handleOpenModalDelete = (transaction: TransactionDTO) => {
        setModalDeleteOpen(true);
        setModalDeleteData(transaction);
    };

    const formatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    };

    useEffect(() => {
        const transactionsWithAccountNames = transactions.map((transaction) => {
            const account = accounts.find((account) => account.id === transaction.accountId);
            const accountName = account ? account.name : "";
            return { ...transaction, accountName };
        });

        transactionsWithAccountNames
            .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
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
                                            {transactionsData?.map((transaction: TransactionDTO) => (
                                                <tr key={transaction.id}>
                                                    <td>{formatDate(transaction.date)}</td>
                                                    <td>{transaction.description}</td>
                                                    <td>{transaction.accountName}</td>
                                                    <td className={
                                                        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                                                    }>
                                                        {transaction.amount !== undefined ? (
                                                            Number.isInteger(transaction.amount) ? (
                                                                `R$ ${transaction.amount.toFixed(0)}`
                                                            ) : (
                                                                `R$ ${transaction.amount.toFixed(2)}`
                                                            )
                                                        ) : (
                                                            'R$ 0.00'
                                                        )
                                                        }
                                                    </td>
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
                            <div className="font-medium text-neutral-600 text-4xl">
                                {balance?.totalBalance !== undefined ? (
                                    Number.isInteger(balance?.totalBalance) ? (
                                        `R$ ${balance?.totalBalance.toFixed(0)}`
                                    ) : (
                                        `R$ ${balance?.totalBalance.toFixed(2)}`
                                    )
                                ) : (
                                    'R$ 0.00'
                                )
                                }
                            </div>
                        </div>
                        <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
                            <div className="font-medium text-slate-400">Expenses</div>
                            <div className="font-medium text-red-600 text-4xl">
                                {balance?.totalExpenses !== undefined ? (
                                    Number.isInteger(balance?.totalExpenses) ? (
                                        `R$ ${balance?.totalExpenses.toFixed(0)}`
                                    ) : (
                                        `R$ ${balance?.totalExpenses.toFixed(2)}`
                                    )
                                ) : (
                                    'R$ 0.00'
                                )
                                }
                            </div>
                        </div>
                        <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
                            <div className="font-medium text-slate-400">Incomes</div>
                            <div className="font-medium text-green-600 text-4xl">
                                {balance?.totalIncomes !== undefined ? (
                                    Number.isInteger(balance?.totalIncomes) ? (
                                        `R$ ${balance?.totalIncomes.toFixed(0)}`
                                    ) : (
                                        `R$ ${balance?.totalIncomes.toFixed(2)}`
                                    )
                                ) : (
                                    'R$ 0.00'
                                )

                                }
                            </div>
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

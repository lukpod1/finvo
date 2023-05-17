import Layout from "@/components/Layout";
import Modal, { ModalType } from "@/components/Modal";
import ModalDelete from "@/components/ModalDelete";
import { useSession } from "@/contexts/session";
import { useState } from "react";

export default function Transactions(props: any) {
    const { balance, transactions } = useSession();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);
    const [modalDeleteData, setModalDeleteData] = useState<any>(null);
    const [type, setType] = useState<ModalType>('');

    const handleModalOpen = (type: ModalType, data: any) => {
        setModalData(data);
        setType(type);
        setModalOpen(true);
    }

    const handleOpenModalDelete = (transaction: any) => {
        setModalDeleteOpen(true);
        setModalDeleteData(transaction);
    }

    const formatDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return formattedDate;
    }
    return (
        <Layout>
            <div className="flex flex-row flex-wrap justify-between container mx-auto py-4">
                <div className="flex flex-wrap w-4/5">
                    <div className="font-sans text-center text-white transition-shadow rounded-lg shadow-md overflow-hidden w-full mr-4 mb-4 pointer-events-auto opacity-100">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full border-spacing-0 border-collapse">
                                {/* head */}
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
                                    {transactions?.map((transaction: any) => (
                                        <tr key={transaction.id}>
                                            <td>{formatDate(transaction.date)}</td>
                                            <td>{transaction.description}</td>
                                            <td>{transaction.accountName}</td>
                                            <td className={
                                                transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                                            }>R$ {transaction.amount}</td>
                                            <td>

                                                <label htmlFor="my-modal"
                                                    className="btn btn-primary mr-2"
                                                    onClick={() => handleModalOpen('edit', transaction)}
                                                >
                                                    Edit
                                                </label>

                                                <label htmlFor="modal-delete"
                                                    className="btn btn-secondary"
                                                    onClick={() => handleOpenModalDelete(transaction)}>
                                                    Delete
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="block w-1/5">
                    <div className="w-full bg-gray-900 text-white transition-shadow duration-300 ease-in-out overflow-hidden shadow-md rounded-lg mb-4 cursor-default">
                        <div className="p-4 flex flex-row items-center justify-between overflow-hidden ">
                            <div className="max-w-md mr-5">
                                <div className="flex flex-row items-center">
                                    <p className="m-0 mr-2 text-base font-sans font-normal leading-6 text-opacity-70 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">Current Balance</p>
                                </div>
                                <h5 className="cursor-default overflow-hidden whitespace-nowrap text-ellipsis text-left mt-3 font-sans font-semibold text-white text-3xl">R$ {balance.totalBalance}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-gray-900 text-white transition-shadow duration-300 ease-in-out overflow-hidden shadow-md rounded-lg mb-4 cursor-default">
                        <div className="p-4 flex flex-row items-center justify-between overflow-hidden ">
                            <div className="max-w-md mr-5">
                                <div className="flex flex-row items-center">
                                    <p className="m-0 mr-2 text-base font-sans font-normal leading-6 text-opacity-70 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">Incomes</p>
                                </div>
                                <h5 className="cursor-default overflow-hidden whitespace-nowrap text-ellipsis text-left mt-3 font-sans font-semibold text-green-600 text-3xl">R$ {balance.totalIncomes}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-gray-900 text-white transition-shadow duration-300 ease-in-out overflow-hidden shadow-md rounded-lg cursor-default">
                        <div className="p-4 flex flex-row items-center justify-between overflow-hidden ">
                            <div className="max-w-md mr-5">
                                <div className="flex flex-row items-center">
                                    <p className="m-0 mr-2 text-base font-sans font-normal leading-6 text-opacity-70 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">Expenses</p>
                                </div>
                                <h5 className="cursor-default overflow-hidden whitespace-nowrap text-ellipsis text-left mt-3 font-sans font-semibold text-red-600 text-3xl">R$ {balance.totalExpenses}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    type={type}
                    onClose={() => setModalOpen(false)}
                    data={modalData}
                />
            )}

            {isModalDeleteOpen && (
                <ModalDelete
                    data={modalDeleteData}
                    onClose={() => setModalDeleteOpen(false)}
                />
            )}
        </Layout>
    )
}
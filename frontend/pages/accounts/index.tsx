import Layout from "@/components/Layout";
import Modal, { ModalType } from "@/components/Modal";
import ModalDelete from "@/components/ModalDelete";
import { Account } from "@/domain/Account";
import { useSessionStore } from "@/store/session";
import { useState } from "react";

export default function Accounts(props: any) {
    const { balance, accounts } = useSessionStore();
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [modalDeleteData, setModalDeleteData] = useState<any>(null);
    const [modalData, setModalData] = useState<any>(null);
    const [type, setType] = useState<ModalType>('');

    const handleModalOpen = (type: ModalType) => {
        setType(type);
        setModalCreateOpen(true);
    }

    const handleModalEditOpen = (type: ModalType, data: any) => {
        setModalData(data);
        setType(type);
        setModalEditOpen(true);
    }

    const handleOpenModalDelete = (account: any) => {
        setModalDeleteOpen(true);
        setModalDeleteData(account);
    }

    const handleOpenModalExpense = (accountId: string) => {
        setModalData({ accountId, accounts });
        setType('expense');
        setModalCreateOpen(true);
    }

    return (
        <Layout>
            <div className="flex flex-wrap justify-between container mx-auto py-4">
                <div className="flex flex-wrap w-full md:w-4/5">
                    <div className="font-sans text-center bg-base-300 rounded-lg shadow-md overflow-hidden w-full md:w-96 h-60 m-2">
                        <label htmlFor="my-modal" onClick={() => handleModalOpen('account')}>
                            <div className="font-sans text-center py-4 pb-6">
                                <div className="h-52 flex flex-col items-center justify-center cursor-pointer group">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-purple-600 cursor-pointer group-hover:bg-purple-600 group-hover:text-white">
                                        +
                                    </div>
                                    <h6 className="text-center cursor-pointer m-0 font-sans font-medium leading-relaxed text-lg text-indigo-500 mt-4 group-hover:text-white">
                                        New Account
                                    </h6>
                                </div>
                            </div>
                        </label>
                    </div>
                    {accounts?.map((account: Account) => (
                        <div
                            key={account.id}
                            className="font-sans text-center text-white transition-shadow bg-base-300 rounded-lg shadow-md overflow-hidden w-full md:w-96 h-60 m-2 pointer-events-auto opacity-100">
                            <div className="h-4/5 text-center text-white pointer-events-auto p-4">
                                <div className="font-sans text-center text-white pointer-events-auto flex flex-row justify-between items-center">
                                    <div className="font-sans text-center text-white pointer-events-auto flex flex-row items-center cursor-pointer flex-1">
                                        <h6 className="text-center pointer-events-auto cursor-pointer m-0 font-sans font-bold text-xl text-white opacity-70">{account.name}</h6>
                                    </div>
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost m-1 rounded-lg">:</label>
                                        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-xl w-52">
                                            <label htmlFor="my-modal"><li><a onClick={() => handleModalEditOpen('account', account)}>Edit</a></li></label>
                                            <label htmlFor="modal-delete"><li><a onClick={() => handleOpenModalDelete(account)}>Delete</a></li></label>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center pointer-events-auto cursor-pointer">
                                    <div className="flex flex-row justify-between items-center mt-4">
                                        <p className="text-white m-0 text-base font-medium leading-6">Current Balance</p>
                                        <p className="m-0 text-base font-medium font-sans leading-1.5 text-green-500">
                                            {account.balance !== undefined ? (
                                                Number.isInteger(account.balance) ? (
                                                    `R$ ${account.balance.toFixed(0)}`
                                                ) : (
                                                    `R$ ${account.balance.toFixed(2)}`
                                                )
                                            ) : (
                                                'R$ 0,00'
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-1/5 flex font-sans text-center items-center justify-end px-4 text-white pointer-events-auto border-t border-solid border-opacity-5 border-white">
                                <label htmlFor="my-modal" onClick={() => handleOpenModalExpense(account.id)}>
                                    <span className="cursor-pointer select-none leading-tight uppercase text-lg text-purple-600 w-full inline-flex items-center font-sans">Add Expense</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-1/5">
                    <div className="w-full bg-base-300 text-white transition-shadow duration-300 ease-in-out overflow-hidden shadow-md rounded-lg cursor-default m-2">
                        <div className="p-4 flex flex-row items-center justify-between overflow-hidden ">
                            <div className="max-w-md mr-5">
                                <div className="flex flex-row items-center">
                                    <p className="m-0 mr-2 text-base font-sans font-normal leading-6 text-opacity-70 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">Current Balance</p>
                                </div>
                                <h5 className="cursor-default overflow-hidden whitespace-nowrap text-ellipsis text-left mt-3 font-sans font-semibold text-white text-3xl">
                                    {balance.totalBalance !== undefined ? (
                                        Number.isInteger(balance.totalBalance) ? (
                                            `R$ ${balance.totalBalance.toFixed(0)}`
                                        ) : (
                                            `R$ ${balance.totalBalance.toFixed(2)}`
                                        )
                                    ) : (
                                        'R$ 0,00'
                                    )
                                    }
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalCreateOpen && (
                <Modal
                    action="create"
                    type={type}
                    onClose={() => setModalCreateOpen(false)}
                />
            )}

            {isModalEditOpen && (
                <Modal
                    action="edit"
                    type={type}
                    onClose={() => setModalEditOpen(false)}
                    data={modalData}
                />
            )}

            {isModalDeleteOpen && (
                <ModalDelete
                    type="account"
                    data={modalDeleteData}
                    onClose={() => setModalDeleteOpen(false)}
                />
            )}

        </Layout>
    )
}
import { useSession } from "@/contexts/session";
import { deleteTransaction } from "@/services/transactions";

interface ModalDeleteProps {
    onClose: () => void;
    data: any;
}

export default function ModalDelete({ onClose, data }: ModalDeleteProps) {

    const { updateBalance, getAccountsByUserId, getTransactionsByUserId } = useSession();

    const handleDelete = async () => {
        await deleteTransaction(data);
        onClose();
        updateBalance(data.userId);
        getAccountsByUserId(data.userId);
        getTransactionsByUserId(data.userId);
    }

    return (
        <>
            <input type="checkbox" id="modal-delete" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="modal-delete" className="btn btn-sm btn-circle absolute right-2 top-2">X</label>
                    <h3 className="text-lg font-bold">You want to delete:</h3>
                    <div className="p-4">
                        <form action="">
                            <div className="mb-4">
                                <label className="text-gray-700">Description</label>
                                <p>{data?.description}</p>
                            </div>
                            <div className="mb-4">
                                <label className="text-gray-700">Amount</label>
                                <p>R$ {data?.amount}</p>
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <label htmlFor="modal-delete" className="btn btn-sm btn-outline" onClick={onClose}>Cancel</label>
                            <button className="btn btn-sm btn-secondary ml-2" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
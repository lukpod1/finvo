import { deleteAccount } from "@/services/accounts";
import { deleteTransaction } from "@/services/transactions";
import { useSessionStore } from "@/store/session";

interface ModalDeleteProps {
	type: "account" | "transaction";
	onClose: () => void;
	data: any;
}

export default function ModalDelete({ onClose, data, type }: ModalDeleteProps) {

	const { updateBalance, getAccountsByUserId, getTransactionsByUserId } = useSessionStore();

	const handleDelete = async () => {
		type === "transaction" ? await deleteTransaction(data) : await deleteAccount(data);
		onClose();
		await updateBalance(data.userId);
		await getAccountsByUserId(data.userId);
		await getTransactionsByUserId(data.userId);
	}

	return (
		<>
			<input type="checkbox" id="modal-delete" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label htmlFor="modal-delete" className="btn btn-sm btn-circle absolute right-2 top-2">X</label>
					{type === "transaction" ? (
						<>
							<h3 className="text-lg font-bold">You want to delete:</h3>
							<div className="flex py-5">
								<div className="block ">
									<label className="text-gray-700">Description</label>
									<p>{data?.description}</p>
								</div>
								<div className="block m-auto ">
									<label className="text-gray-700">Amount</label>
									<p>R$ {data?.amount}</p>
								</div>
							</div>
							<div className="flex justify-between mt-8">
								<label htmlFor="modal-delete" className="btn btn-sm btn-outline" onClick={onClose}>Cancel</label>
								<button className="btn btn-sm btn-secondary ml-2" onClick={handleDelete}>Delete</button>
							</div>
						</>
					) : (
						<>
							<h5 className="text-2xl font-bold text-center mb-4">Delete Account</h5>
							<p className="text-center">Are you sure want to delete account <b>{data?.name}</b></p>
							<h6 className="my-6">
								<b>Attention</b>
								: By deleting this account, all of your incomes and expenses related to it will also be deleted.
							</h6>
							<div className="flex justify-between mt-8">
								<label htmlFor="modal-delete" className="btn btn-sm btn-outline" onClick={onClose}>Cancel</label>
								<button className="btn btn-sm btn-secondary ml-2" onClick={handleDelete}>Delete</button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}
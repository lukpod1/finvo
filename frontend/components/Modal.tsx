import { createAccount } from "@/services/accounts";
import { createTransaction } from "@/services/transactions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  type: string;
  onClose: () => void;
}

export default function Modal({ type, onClose }: ModalProps) {
  const { register, handleSubmit, reset } = useForm();
  //const [type, setType] = useState('account');
  const mutation = useMutation(
    type === 'account' ? createAccount : createTransaction,
    {
      onSuccess: () => {
        reset();
        onClose();
      },
    }
  );

  const onSubmit = (data: any): void => {
    mutation.mutate(data);
  }

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">X</label>
          <h3 className="text-lg font-bold">Create {type}</h3>
          <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {type === "account" && (
                <>
                  <div className="mb-4">
                    <label className="text-gray-700">Name</label>
                    <input type="text" className="form-input mt-1 block w-full" {...register("name", {required: true})} />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Balance</label>
                    <input type="number" className="form-input mt-1 block w-full" {...register("balance", { required: true })} />
                  </div>
                </>
              )}
              {(type === "expense" || type === "income") && (
                <>
                  <div className="mb-4">
                    <label className="text-gray-700">Amount</label>
                    <input type="number" className="form-input mt-1 block w-full" {...register("amount", { required: true })} />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Description</label>
                    <input type="text" className="form-input mt-1 block w-full" {...register("description", { required: true })} />
                  </div>
                </>
              )}
              {type !== "account" && (
                <div className="mb-4">
                  <label className="text-gray-700">Account</label>
                  <select name="accountId" className="form-select mt-1 block w-full" onChange={(e) => console.log(e.target.value)}>
                    <option value="">Select account</option>
                    <option value="account-1">Account 1</option>
                    <option value="account-2">Account 2</option>
                  </select>
                </div>
              )}
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary mr-2">Create {type}</button>
                <label htmlFor="my-modal" className="btn btn-secondary">Cancel</label>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <label htmlFor="my-modal" className="btn">{type === "account" ? "Create account" : "Add transaction"}</label> */}
    </>
  )
}
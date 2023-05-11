import { SessionContext, useSession } from "@/contexts/session";
import { createAccount, getBalance } from "@/services/accounts";
import { createTransaction } from "@/services/transactions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  type: string;
  onClose: () => void;
}

export default function Modal({ type, onClose }: ModalProps) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const { session, accounts, updateBalance, getAccountsByUserId } = useSession();
  const mutation = useMutation(
    type === 'account' ? createAccount : createTransaction,
    {
      onSuccess: () => {
        reset();
        onClose();
        if (type === 'account' || type === 'income' || type === 'expense') {
          updateBalance(session.id);
          getAccountsByUserId(session.id);
        }
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
              <input type="hidden" value={session.id} {...register("userId", { required: true })} />
              {type === "account" && (
                <>
                  <div className="mb-4">
                    <label className="text-gray-700">Name</label>
                    <input type="text" className="form-input mt-1 block w-full" {...register("name", { required: true })} />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Balance</label>
                    <input type="number" className="form-input mt-1 block w-full" {...register("balance", { required: true })} />
                  </div>
                </>
              )}
              {type !== "account" && (
                <>
                  <input type="hidden" value={type} {...register("type", { required: true })} />
                  <div className="mb-4">
                    <label className="text-gray-700">Amount</label>
                    <input type="number" className="form-input mt-1 block w-full" {...register("amount", { required: true })} />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Description</label>
                    <input type="text" className="form-input mt-1 block w-full" {...register("description", { required: true })} />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Date</label>
                    <input type="date" className="form-input mt-1 block w-full" {...register("date", { required: true })} />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Account</label>
                    <select name="accountId" className="form-select mt-1 block w-full">
                      <option value="">Select account</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id} {...register("accountId", { required: true })}>{account.name}</option>
                      ))}
                    </select>
                  </div>
                </>
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
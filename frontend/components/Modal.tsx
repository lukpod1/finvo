import { SessionContext, useSession } from "@/contexts/session";
import { createAccount, getBalance, updateAccount } from "@/services/accounts";
import { createTransaction, updateTransaction } from "@/services/transactions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  type: ModalType;
  action: ModalAction;
  onClose: () => void;
  data?: any;
}

export type ModalType = 'account' | 'income' | 'expense' | '';
export type ModalAction = 'create' | 'edit' ;

export default function Modal({ type, action, onClose, data }: ModalProps) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const { session, accounts, updateBalance, getAccountsByUserId, getTransactionsByUserId } = useSession();
  const [formData, setFormData] = useState<any>(data || {});
  
  const mutation = useMutation(
    (formData) => {
      if (type === "account") {
        return action === "create" ? createAccount(formData) : updateAccount(formData);
      } else {
        return action === "create" ? createTransaction(formData) : updateTransaction(formData);
      }
    },
    {
      onSuccess: () => {
        reset();
        onClose();
        if (type === 'account' || type === 'income' || type === 'expense' || action === 'edit') {
          updateBalance(session?.id);
          getAccountsByUserId(session?.id);
          getTransactionsByUserId(session?.id);
        }
      },
    }
  );

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const onSubmit = (): void => {
    if (type === 'account') {
      const accountData = {
        ...formData,
        userId: session.id,
      }

      mutation.mutate(accountData);
    } else {
      const transactionData = {
        ...formData,
        type: type,
        userId: session.id,
      }

      mutation.mutate(transactionData);
    }
  }

  const handleCancel = (): void => {
    onClose();
    setFormData({});
  }

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleCancel}>X</label>
          <h3 className="text-lg font-bold">{action === 'edit' ? 'Edit' : 'Create'} {type}</h3>
          <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" value={session.id} {...register("userId", { required: true })} />
              {type === "account" && (
                <>
                  <div className="mb-4">
                    <label className="text-gray-700">Name</label>
                    <input 
                      type="text" 
                      className="form-input mt-1 block w-full" 
                      {...register("name", { required: true })} 
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Balance</label>
                    <input 
                      disabled={action === 'edit'}
                      type="number" 
                      className="form-input mt-1 block w-full" 
                      {...register("balance", { required: true })} 
                      value={formData.balance}
                      onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    />
                  </div>
                </>
              )}
              {type !== "account" && (
                <>
                  <input type="hidden" value={type} {...register("type", { required: true })} />
                  <div className="mb-4">
                    <label className="text-gray-700">Amount</label>
                    <input 
                      type="number" 
                      className="form-input mt-1 block w-full" 
                      {...register("amount", { required: true })}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Description</label>
                    <input 
                      type="text" 
                      className="form-input mt-1 block w-full" 
                      {...register("description", { required: true })} 
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Date</label>
                    <input 
                      type="date" 
                      className="form-input mt-1 block w-full" 
                      {...register("date", { required: true })}
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-700">Account</label>
                    <select 
                      className="form-select mt-1 block w-full" 
                      {...register("accountId", { required: true })}
                      value={formData.accountId || ''}
                      onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                    >
                      <option value="">Select account</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary mr-2">{action === 'edit' ? 'Edit' : 'Create'} {type}</button>
                <label htmlFor="my-modal" className="btn btn-secondary" onClick={handleCancel}>Cancel</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
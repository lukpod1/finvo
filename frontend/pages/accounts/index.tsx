import Layout from "@/components/Layout";
import { useSession } from "@/contexts/session";

export default function Accounts(props: any) {
    const { balance, accounts } = useSession();

    return (
        <Layout>
            <div className="flex flex-row flex-wrap justify-between container mx-auto px-4 py-8">
                <div className="flex flex-wrap w-3/4">
                    <div className="font-sans text-center text-white transition-shadow bg-gray-900 rounded-lg shadow-md overflow-hidden w-96 h-60 mr-4 mb-4 pointer-events-auto opacity-100">
                        <div className="font-sans text-center text-white pointer-events-auto py-4 pb-6">
                            <div className="h-52 flex flex-col items-center justify-center cursor-pointer text-white font-sans text-center">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-purple-600 cursor-pointer">
                                    +
                                </div>
                                <h6 className="text-center pointer-events-auto cursor-pointer m-0 font-sans font-medium leading-relaxed text-lg text-indigo-500 mt-4">New Account</h6>
                            </div>
                        </div>
                    </div>
                    {accounts?.map((account) => (
                        <>
                            <div className="font-sans text-center text-white transition-shadow bg-gray-900 rounded-lg shadow-md overflow-hidden w-96 h-60 mr-4 mb-4 pointer-events-auto opacity-100">
                                <div className="h-4/5 text-center text-white pointer-events-auto p-4">
                                    <div className="font-sans text-center text-white pointer-events-auto flex flex-row justify-between items-center">
                                        <div className="font-sans text-center text-white pointer-events-auto flex flex-row items-center cursor-pointer flex-1">
                                            <h6 className="text-center pointer-events-auto cursor-pointer m-0 font-sans font-bold text-xl text-white opacity-70">{account.name}</h6>
                                        </div>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost m-1 rounded-lg">:</label>
                                            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-xl w-52">
                                                <label htmlFor="my-modal"><li><a >Edit</a></li></label>
                                                <label htmlFor="my-modal"><li><a >Delete</a></li></label>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="text-center pointer-events-auto cursor-pointer">
                                        <div className="flex flex-row justify-between items-center mt-4">
                                            <p className="text-white m-0 text-base font-medium leading-6">Current Balance</p>
                                            <p className="m-0 text-base font-medium font-sans leading-1.5 text-green-500">R$ {account.balance}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1/5 flex font-sans text-center items-center justify-end px-4 text-white pointer-events-auto border-t border-solid border-opacity-5 border-white">
                                    <button>
                                        <span className="cursor-pointer select-none leading-tight uppercase text-lg text-purple-600 w-full inline-flex items-center font-sans">Add Expense</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className="block w-1/4">
                    <div className="w-full bg-gray-900 text-white transition-shadow duration-300 ease-in-out overflow-hidden shadow-md rounded-lg p-2 cursor-default">
                        <div className="p-4 flex flex-row items-center justify-between overflow-hidden ">
                            <div className="max-w-md mr-5">
                                <div className="flex flex-row items-center">
                                    <p className="m-0 mr-2 text-base font-sans font-normal leading-6 text-opacity-70 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">Current Balance</p>
                                </div>
                                <h5 className="cursor-default overflow-hidden whitespace-nowrap text-ellipsis text-left mt-3 font-sans font-semibold text-white text-3xl">R$ {balance.totalBalance}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
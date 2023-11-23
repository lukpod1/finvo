import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal, { ModalType } from "./Modal";
import { useSessionStore } from "@/store/session";

export default function Navbar() {
	const router = useRouter();
	const { session } = useSessionStore();
	const [type, setType] = useState<ModalType>('');

	const handleModalOpen = (type: ModalType) => {
		setType(type);
	}

	const handleSignOut = async () => {
		localStorage.removeItem('session');
		router.push('/login');
	}

	return (
		<>
			<div className="navbar bg-base-300">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
						</label>
						<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-md w-52 border">
							<li><Link href={"/dashboard"}>Dashboard</Link></li>
							<li><Link href={"/accounts"}>Accounts</Link></li>
							<li><Link href={"/transactions"}>Transactions</Link></li>
						</ul>
					</div>
					<a className="btn btn-ghost normal-case text-xl">Finvo</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li><Link href={"/dashboard"}>Dashboard</Link></li>
						<li><Link href={"/accounts"}>Accounts</Link></li>
						<li><Link href={"/transactions"}>Transactions</Link></li>
					</ul>
				</div>
				<div className="navbar-end">
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost rounded-lg">+</label>
						<ul tabIndex={0} className="menu dropdown-content pt-2 pb-2 shadow bg-base-100 rounded-md w-52 mt-4 border-solid border">
							<label htmlFor="my-modal"><li><a onClick={() => handleModalOpen("account")}>Account</a></li></label>
							<label htmlFor="my-modal"><li><a onClick={() => handleModalOpen("income")}>Income</a></li></label>
							<label htmlFor="my-modal"><li><a onClick={() => handleModalOpen("expense")}>Expense</a></li></label>
						</ul>
					</div>
					{type && <Modal action="create" type={type} onClose={() => setType('')} />}
					<ul className="menu menu-horizontal px-1">
						<li>{session?.name}</li>
					</ul>
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<Image width={40} height={40} src={session?.picture} alt="profile picture" />
							</div>
						</label>
						<ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-md w-32 border">
							<li><a onClick={handleSignOut}>Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

import Head from "next/head";
import Link from "next/link";
import { setCookie } from "nookies";

export async function getServerSideProps(context: any) {
	const { token } = context.query;

	if (token) {
		setCookie(context, 'session', token.toString());
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function Login(props: any) {

	return (
		<div>
			<Head>
				<title>Finvo</title>
			</Head>
			<div className="bg-black h-screen flex flex-col justify-center items-center">
				<div className="bg-white h-3/4 w-4/5 rounded-lg shadow-lg flex flex-col justify-center items-center animate-fade-in">
					<div className="w-full">
						<h1 className="text-black text-center text-2xl md:text-4xl font-bold mb-6">
							Finvo
						</h1>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form className="space-y-6" action="#" method="POST">
							<div>
								<label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="bg-white block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
										Password
									</label>
									<div className="text-sm">
										<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
											Forgot password?
										</a>
									</div>
								</div>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="bg-black flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
								>
									Sign in
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Not a member?{' '}
							<a href="#" className="font-semibold leading-6 text-black hover:text-black">
								Start a 14 day free trial
							</a>
						</p>
					</div>

					<div className="w-full self-center flex flex-col justify-center items-center">
						<Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`}>
							<button className="bg-black text-white rounded-md px-8 py-4 text-sm sm:text-lg md:text-xl lg:text-2xl hover:bg-white hover:text-black hover:border-black border-2 border-black transition duration-300 ease-in-out">
								Continue with Google
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>


	)
}

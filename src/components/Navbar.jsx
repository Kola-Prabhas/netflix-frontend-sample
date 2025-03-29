import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';


const Navbar = () => {
	const { user, logout } = useAuthStore();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};
	const { setContentType } = useContentStore();

	function toggleDropDown() {
		setShowDropDown(!showDropDown);
	}


	return (
		<div>
			<header className="w-full mx-auto flex flex-wrap items-center justify-between p-3 px-16 h-20">
				<div className="flex items-center gap-10 z-50">
					<Link to="/">
						<img
							src="/netflix-logo.png"
							alt="NETFLIX LOGO"
							className="w-32 sm:w-24"
						/>
					</Link>
					{/* desktop navbar items */}
					<div className="hidden sm:flex gap-6 items-center">
						<Link
							to="/"
							className="hover:text-white/60 transition-colors duration-500"
							onClick={() => setContentType('movie')}
						>
							Movies
						</Link>
						<Link
							to="/"
							className="hover:text-white/60 transition-colors duration-500"
							onClick={() => setContentType('tv')}
						>
							Tv Shows
						</Link>
						<Link
							to="/history"
							className="hover:text-white/60 transition-colors duration-500"
						>
							Search History
						</Link>
					</div>
				</div>
				<div className="relative flex gap-5 items-center z-50">
					<Link to="/search">
						<Search className="size-6 cursor-pointer" />
					</Link>
					<img
						src={user.image}
						alt="Avatar"
						className="h-8 rounded cursor-pointer"
						onClick={toggleDropDown}
					/>
					{showDropDown && <DropDown onLogoutClick={logout} />}
					<div className="sm:hidden">
						<Menu
							className="size-6 cursor-pointer"
							onClick={toggleMobileMenu}
						/>
					</div>
				</div>
				{isMobileMenuOpen && (
					<div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
						<Link className="block hover:text-white/60 transition-colors duration-500">
							Movies
						</Link>
						<Link className="block hover:text-white/60 transition-colors duration-500">
							Tv Shows
						</Link>
						<Link className="block hover:text-white/60 transition-colors duration-500">
							Search History
						</Link>
					</div>
				)}
			</header>
		</div>
	);
};


function DropDown({ onLogoutClick }) {
	return (
		<div className='w-[100px] absolute right-[-35px] bottom-[-75px] *:hover:bg-white/20 *:w-full text-center font-medium rounded-lg *:rounded-md flex flex-col gap-2 p-2 *:px-2 *:py-0.5 bg-black text-white'>
			<Link
				to="/profile"
				className="text-sm hover:text-white/80"
			>
				Profile
			</Link>
			<button
				className="cursor-pointer text-sm text-red-500 hover:text-red-300"
				onClick={onLogoutClick}
			>
				Logout
			</button>
		</div>
	)
}


export default Navbar;
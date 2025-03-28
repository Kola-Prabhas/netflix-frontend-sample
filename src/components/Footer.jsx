const Footer = () => {
	return (
		<footer className="py-6 md:px-8 md:py-0 bg-[#141414] text-white border-t border-gray-800">
			<div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
					Built by{' '}
					<span
						className="font-medium underline underline-offset-4"
					>
						Team 9
					</span>
					.Under the guidance of {' '}
					<span
						className="font-medium underline underline-offset-4"
					>
						Saritha Mam
					</span>
					.
				</p>
			</div>
		</footer>
	);
};
export default Footer;